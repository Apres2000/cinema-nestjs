export class CreatePlaylistDto {
  name!: string;
  visibility?: 'private' | 'public'; // по умолчанию private
}
