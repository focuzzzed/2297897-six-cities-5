export class CreateCommentDto {
  public description: string;
  public rating: number;
  public authorId: string;
  public offerId: string; //TODO: Добавить это поле в спеку
}
