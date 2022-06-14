export interface Config extends IntersectionObserverInit {
  path: string;
  checkLastPage: boolean;
}

export type InitConfig = Partial<Config> & Required<Pick<Config, 'path'>>;
