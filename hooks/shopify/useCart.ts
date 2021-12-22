import { useEffect, useState } from "react";
import { makeVar, useMutation, useQuery, useReactiveVar } from "@apollo/client";

import type { Cart } from "types";

import {
  CREATE_CART,
  GET_CART_ID,
  GET_CART_FROM_ID,
  ADD_ITEM_TO_CART,
} from "graphql/shopify";
import { useLocalStorage } from "hooks";
import { REMOVE_ITEM_FROM_CART } from "graphql/shopify/mutations/carts";

const cartLengthVar = makeVar({ cartLength: 0})

export function useCart() {
  const { setItem, getItem } = useLocalStorage();
  const [cartId, setCartId] = useState(getItem({ key: "cartId" }));
	const { cartLength } = useReactiveVar(cartLengthVar)
  const [cart, setCart] = useState<Cart>({
    items: [],
    subtotal: "",
    checkoutUrl: "",
  });
  const [createCartMutation] = useMutation(CREATE_CART, {
    onError: (error) => console.log(JSON.stringify(error, null, 2)),
    refetchQueries: [
      { query: GET_CART_ID, fetchPolicy: "network-only" },
      {
        query: GET_CART_FROM_ID,
        variables: { cartId },
        fetchPolicy: "network-only",
      },
    ],
  });
  const [updatedCartMutation] = useMutation(ADD_ITEM_TO_CART, {
    onError: (error) => console.log(JSON.stringify(error, null, 2)),
    refetchQueries: [
      { query: GET_CART_ID, fetchPolicy: "network-only" },
      {
        query: GET_CART_FROM_ID,
        variables: { cartId },
        fetchPolicy: "network-only",
      },
    ],
  });

  const addItemToCart = async ({
    quantity,
    merchandiseId,
    key,
    value,
  }: any) => {
    if (!cartId) {
      const cart = await createCartMutation({
        variables: {
          cartInput: {
            lines: { quantity, merchandiseId },
            attributes: { key, value },
          },
        },
      });
      setItem({ key: "cartId", value: cart?.data?.cartCreate?.cart?.id });
      setCartId(cart?.data?.cartCreate?.cart?.id);
    } else {
      const updatedCart = await updatedCartMutation({
        variables: {
          cartId,
          cartLineInput: [
            {
              quantity,
              merchandiseId,
            },
          ],
        },
      });
      console.log({ updatedCart });
    }
  };

  const { data: cartData } = useQuery(GET_CART_FROM_ID, {
    skip: !cartId,
    variables: { cartId },
    onError: (error) => console.log(JSON.stringify(error, null, 2)),
  });

  const { data: cartIdData } = useQuery(GET_CART_ID, {
    onError: (error) => console.log(JSON.stringify(error, null, 2)),
  });

  useEffect(() => {
    if (!!cartId) {
      const items = cartData?.cart?.lines?.edges?.map(({ node }: any) => {
        const merchandise = node?.merchandise;
        return {
          merchandiseId: node?.id,
          productVariantId: merchandise?.id,
          image: merchandise?.image?.originalSrc,
          title: merchandise?.title,
          quantity: node?.quantity,
          price: merchandise?.priceV2?.amount,
        };
      });
      const subtotal: any = cartData?.cart?.estimatedCost?.subtotalAmount;
      const cartToSet = {
        subtotal: `${subtotal?.currencyCode} $${Number(
          subtotal?.amount
        ).toFixed(2)}`,
        items,
        checkoutUrl: cartData?.cart?.checkoutUrl,
      };
			console.log({ items })
			if (!!items) { 
				console.log(`length: ${items.length}`)
				cartLengthVar({ cartLength: items?.length})
			}
      setCart({ ...cartToSet });
    }
  }, [cartData, cartIdData, cartId]);

	useEffect(() => {
		console.log("useCart")
		console.log({ cartLength })
	}, [cartLength])

  const [removeItemFromCartMutation, { loading: removeItemFromCartLoading }] =
    useMutation(REMOVE_ITEM_FROM_CART, {
      onError: (error) => console.log(JSON.stringify(error, null, 2)),
      refetchQueries: [
        { query: GET_CART_ID, fetchPolicy: "network-only" },
        {
          query: GET_CART_FROM_ID,
          variables: { cartId },
          fetchPolicy: "network-only",
        },
      ],
    });

  const removeItemFromCart = async ({ merchandiseId }: any) => {
    const lineIds = [merchandiseId];
    const removedItem = await removeItemFromCartMutation({
      variables: { cartId, lineIds },
    });
    console.log({ removedItem });
  };

  return {
    cart,
    cartLength,
    addItemToCart,
    removeItemFromCart,
    removeItemFromCartLoading,
  };
}
