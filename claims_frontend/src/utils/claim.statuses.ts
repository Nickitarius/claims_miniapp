export enum StatusTag {
  Taken = 'В работе',
  NewClaim = 'Новая',
}

export const statusTagToColorMap = new Map([
  [StatusTag.Taken, 'error'],
  [StatusTag.NewClaim, 'info'],
]);
