import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository'; // chỉnh đường dẫn nếu sai
import { User } from './user.entity'; // nếu có entity User (nếu không có thì bỏ dòng này)

@Injectable()
export class RosterService {
  constructor(private userRepository: UserRepository) {}

  async getRosterStats(): Promise<any[]> {
    const users = await this.userRepository.findAll({
      populate: ['articles'], // chỉ load articles
    });

    // Load thêm favoritedBy của từng bài viết
    for (const user of users) {
      await user.articles?.init(); // load articles nếu là Collection
      for (const article of user.articles ?? []) {
        await article.favoritedBy?.init(); // load favoritedBy
      }
    }

    return users.map((user: any) => {
      const articles = user.articles || [];

      const totalArticles = articles.length;

      const totalFavorites = articles.reduce((sum: number, article: any) => {
        return sum + (article.favoritedBy?.length || 0);
      }, 0);

      const firstPostDate = articles.length
        ? new Date(Math.min(...articles.map((a: any) => a.createdAt.getTime())))
        : null;

      return {
        username: user.username,
        profileUrl: `/profile/${user.username}`,
        totalArticles,
        totalFavorites,
        firstPostDate,
      };
    });
  }
}
