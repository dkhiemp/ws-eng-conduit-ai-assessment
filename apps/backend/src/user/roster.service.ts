import { Injectable } from '@nestjs/common';
import { EntityManager } from '@mikro-orm/mysql';

@Injectable()
export class RosterService {
  constructor(private readonly em: EntityManager) {}

  async getRoster() {
    const users = await this.em.getConnection().execute(`
      SELECT
        u.username,
        u.slug as profileUrl,
        COUNT(a.id) as articlesCount,
        COALESCE(SUM(a.favoritesCount), 0) as favoritesCount,
        MIN(a.createdAt) as firstArticleDate
      FROM user u
      LEFT JOIN article a ON a.author_id = u.id
      GROUP BY u.id
      ORDER BY favoritesCount DESC;
    `);

    return users;
  }
}
