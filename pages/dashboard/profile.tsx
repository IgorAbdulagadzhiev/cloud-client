import { User } from '@/api/dto/auth.dto';
import { GetServerSidePropsContext, NextPage } from 'next';

import styles from '@/styles/Profile.module.scss';
import { Button } from 'antd';
import { checkAuth } from '@/utils/checkAuth';

import * as Api from '@/api';
import { Layout } from '@/layouts/Layout';
import { NextPageWithLayout } from '@/types';

interface Props extends User {}

export const DashboardProfilePage: NextPageWithLayout<Props> = ({
  id,
  email,
  fullName,
}) => {
  const onClickLogout = () => {
    if (window.confirm('Вы действительно хотите выйти?')) {
      Api.auth.logout();
      location.href = '/';
    }
  };
  return (
    <main>
      <div className={styles.root}>
        <h1>Мой профиль</h1>
        <br />
        <p>
          ID: <b>{id}</b>
        </p>
        <p>
          Полное имя: <b>{fullName}</b>
        </p>
        <p>
          Email: <b>{email}</b>
        </p>
        <br />
        <Button type="primary" danger onClick={onClickLogout}>
          Выйти
        </Button>
      </div>
    </main>
  );
};

DashboardProfilePage.getLayout = (page: React.ReactNode) => {
  return <Layout title="Dashboard / Профиль">{page}</Layout>;
};

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const authProps = await checkAuth(ctx);

  if ('redirect' in authProps) {
    return authProps;
  }

  const userData = await Api.auth.getMe();

  return {
    props: { ...userData },
  };
};

export default DashboardProfilePage;
