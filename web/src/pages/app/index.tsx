import { getSession, useUser, withPageAuthRequired } from '@auth0/nextjs-auth0';
import { GetServerSideProps } from 'next';
import {
  useGetProductsQuery,
  useMeQuery,
} from '../../graphql/generated/graphql';
import {
  getServerPageGetProducts,
  ssrGetProducts,
} from '../../graphql/generated/page';
import { withApollo } from '../../lib/withApollo';

function Home({ data }) {
  const { user } = useUser();
  const { data: me, loading, error } = useMeQuery();

  return (
    <div>
      <h1>Hello {user?.name}</h1>

      <pre>{JSON.stringify(me, null, 2)}</pre>
      {/* <pre>{JSON.stringify(data.products, null, 2)}</pre> */}

      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}

export const getServerSideProps = withPageAuthRequired({
  getServerSideProps: async (ctx) => {
    // const data = await getServerPageGetProducts(null, ctx);

    return {
      props: {},
    };
  },
});

export default withApollo(ssrGetProducts.withPage()(Home));

// isso aqui embaixo seria a forma manual de fazer o que o withPageAuthRequired() vazio faz:
// export const getServerSideProps: GetServerSideProps = async ({ req, res }) => {
//   const session = getSession(req, res);

//   if (!session) {
//     return {
//       redirect: {
//         destination: '/api/auth/login',
//         permanent: false,
//       },
//     };
//   }

//   return {
//     props: {},
//   };
// };
