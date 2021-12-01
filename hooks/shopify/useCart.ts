import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import type { Cart } from "types";

import {
  CREATE_CART,
  GET_CART_ID,
  GET_CART_FROM_ID,
  ADD_ITEM_TO_CART,
} from "graphql/shopify";
import { useLocalStorage } from "hooks";
import { REMOVE_ITEM_FROM_CART } from "graphql/shopify/mutations/carts";

export function useCart() {
  const { setItem, getItem } = useLocalStorage();
  const [cartId, setCartId] = useState(getItem({ key: "cartId" }));
  const [cart, setCart] = useState<Cart>({ items: [], subtotal: "" });
  const [cartLength, setCartLength] = useState();
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
      // Call cartUpdate mutation
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
          merchandiseId: node?.id, // so confusing lol
          productVariantId: merchandise?.id,
          image: merchandise?.image?.originalSrc,
          title: merchandise?.title,
          quantity: node?.quantity,
          price: merchandise?.priceV2?.amount,
        };
      });
      const subtotal: any = cartData?.cart?.estimatedCost?.subtotalAmount;
      const cartToSet = {
        subtotal: `${subtotal?.currencyCode} $${subtotal?.amount}`,
        items,
				checkoutUrl: cartData?.cart?.checkoutUrl,
      };
      setCart({ ...cartToSet });
      setCartLength(items?.length);
    }
  }, [cartData, cartIdData, cartId]);

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
		console.log({ removedItem })
  };

  return {
    cart,
    cartLength,
    addItemToCart,
    removeItemFromCart,
    removeItemFromCartLoading,
  };
}
