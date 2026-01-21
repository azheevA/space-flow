import {
  CreateItemDto,
  CreateContentDto,
  PhotoRecordDto,
} from "@/server/generate/generate";

export interface ExtendedPhotoDto extends PhotoRecordDto {
  id: number;
  itemId: number;
}

export interface ExtendedContentDto extends CreateContentDto {
  id: number;
  itemId: number;
}
export interface AuthorDto {
  name: string | null;
  email: string;
}

export interface ExtendedItemDto
  extends Omit<CreateItemDto, "content" | "photos"> {
  content: ExtendedContentDto | null;
  photos: ExtendedPhotoDto[];
  author?: AuthorDto;
  createdAt?: string;
}
export type ItemDetails = ExtendedItemDto;
