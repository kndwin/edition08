import { useEffect, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import type { Cart } from 'types'

import { CREATE_CART, GET_CART_ID, GET_CART_FROM_ID } from "graphql/shopify";
import { useLocalStorage } from "hooks";
import { shopifyClient } from "graphql/client";

export function useCart() {
  const { setItem, getItem } = useLocalStorage();
  const [cartId, setCartId] = useState(getItem({ key: "cartId" }));
  const [createCartMutation] = useMutation(CREATE_CART, {
    onError: (error) => console.log(JSON.stringify(error, null, 2)),
    refetchQueries: [{ query: GET_CART_ID }, { query: GET_CART_FROM_ID }],
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

  const [cart, setCart] = useState<Cart>({ items: [], subtotal: ""});

  useEffect(() => {
		if (!!cartId) {
			const items = cartData?.cart?.lines?.edges?.map(({ node }: any) => {
				const merchandise = node?.merchandise
				return {
					image: merchandise?.image?.originalSrc ,
					title: merchandise?.title,
					quantity: node?.quantity,
					price: merchandise?.priceV2?.amount
				}
			})
			const subtotal: any = cartData?.cart?.estimatedCost?.subtotalAmount
			setCart({
				subtotal: `${subtotal?.currencyCode} $${subtotal?.amount}`,
				items
			})
		}
  }, [cartData, cartIdData]);

  return { cart, addItemToCart };
}
