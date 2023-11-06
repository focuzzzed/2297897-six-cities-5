import {Expose} from 'class-transformer';

export class UploadPlaceImagesRdo {
  @Expose()
  public placeImages: string[];
}
