import { Layout } from '@/layouts/Layout';
import { checkAuth } from '@/utils/checkAuth';
import { GetServerSidePropsContext, NextPage } from 'next';

import * as Api from '@/api';
import { FileItem } from '@/api/dto/files.dto';
import { DashboardLayout } from '@/layouts/DashboardLayout';
import { Files } from '@/modules/Files';
import { NextPageWithLayout } from '@/types';
interface Props {
  items: FileItem[];
}

const DashboardPhotos: NextPageWithLayout<Props> = ({ items }) => {
  return (
    <DashboardLayout>
      <Files items={items} withActions />
    </DashboardLayout>
  );
};

DashboardPhotos.getLayout = (page: React.ReactNode) => {
  return <Layout title="Dashboard / Главная">{page}</Layout>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await checkAuth(ctx);

  if ('redirect' in authProps) {
    return authProps;
  }

  try {
    const items = await Api.files.getAll('photos');

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

export default DashboardPhotos;
