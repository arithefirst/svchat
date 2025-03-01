export type TypeMessage = {
  message: string;
  imageSrc: string;
  user: string;
  uid: string;
  timestamp: Date;
};

export type TypeFullMessage = TypeMessage & {
  channel: string;
};
