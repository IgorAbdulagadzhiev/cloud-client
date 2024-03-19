import { Layout } from '@/layouts/Layout';
import { checkAuth } from '@/utils/checkAuth';
import { GetServerSidePropsContext } from 'next';

import * as Api from '@/api';
import { FileItem } from '@/api/dto/files.dto';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { Files } from '@/modules/Files';
import { ReactElement, ReactNode } from 'react';
import { NextPageWithLayout } from '@/types';

type GetLayout = (page: ReactNode) => ReactNode;
interface Props {
  items: FileItem[];
}

const DashboardTrash: NextPageWithLayout<Props> = ({ items }) => {
  return (
    <DashboardLayout>
      <Files items={items} />
    </DashboardLayout>
  );
};

DashboardTrash.getLayout = (page: ReactElement) => {
  return <Layout title="Dashboard / Главная">{page}</Layout>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await checkAuth(ctx);

  if ('redirect' in authProps) {
    return authProps;
  }

  try {
    const items = await Api.files.getAll('trash');

    return {
      props: {
        items,
      },
    };
  } catch (err) {
    console.log(err);
    return {
      props: {
        items: [],
      },
    };
  }
};

export default DashboardTrash;
