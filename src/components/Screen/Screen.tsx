import React from 'react';
import { Layout } from '../Layout/Layout';
import { createFipc } from 'react-fipc';
import { Loader } from '../Loader/Loader';
import { TextFieldList } from '../TextFieldList/TextFieldList.fipc';
import { ImgFieldList } from '../ImgFieldList/ImgFieldList.fipc';
import { MarkdownFieldList } from '../MarkdownFieldList/MarkdownFieldList.fipc';
import './Screen.scss';
import { RenameScreenModal } from '../RenameScreenModal/RenameScreenModal.fipc';
import { Redirect } from 'react-router-dom';
export interface ScreenHooks {
  useScreen: () => {
    isLoading: boolean;
    id: number;
    name: string | undefined;
    description: string | undefined;
  };
}

export interface ScreenProps extends ScreenHooks {
  className?: string;
}

const Screen: React.FC<ScreenProps> = ({ children, className, useScreen }) => {
  const { isLoading, id, name, description } = useScreen();
  if (!name) {
    return <Redirect to="/draws" />;
  }
  return (
    <Layout
      title={name ?? ''}
      description={description ?? ''}
      isScreen={true}
      id={id}
    >
      <Loader isLoading={isLoading} />
      <TextFieldList id={id} />
      <ImgFieldList id={id} />
      <MarkdownFieldList id={id} />
      <RenameScreenModal id={id} />
    </Layout>
  );
};

export const Screen$ = createFipc(Screen);
