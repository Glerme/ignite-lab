export class Content {
  private readonly content: string;

  constructor(content: string) {
    const isValidContent = this.validateContent(content);

    if (!isValidContent) {
      throw new Error('Content Lenght is not valid');
    }

    this.content = content;
  }

  private validateContent(content: string): boolean {
    return content.length > 5 && content.length < 240;
  }

  get value(): string {
    return this.content;
  }
}
