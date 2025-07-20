import { logger } from "comodern";
import { fetchAPI } from "./fetchapi.ts";

interface TokenInfo {
  token: string;
  /** Ex: 藍 */
  displayName: string;
  /** Ex: ai */
  username: string;
  createdAt: Date;
}

export class TokenManager {
  public tokens: string[];
  public tokeninfo: TokenInfo[];
  constructor(tokens: string[]) {
    this.tokens = tokens;
    this.tokeninfo = [];
  }
  /** @returns alive token length or false */
  public async Check() {
    try {
      const results = await Promise.all(
        this.tokens.map((token) =>
          fetchAPI.POST("/i", token).then((res) => ({
            token,
            success: res.success,
            data: res.data,
          }))
        )
      );

      results.forEach(({ token, success, data }) => {
        if (success) {
          logger.success(`[ALIVE] ${token.slice(0, 5)}`);
          this.tokeninfo.push({
            token,
            displayName: data.name,
            username: data.username,
            createdAt: data.createdAt,
          });
        } else {
          logger.fail(`[DEAD] ${token.slice(0, 5)}`);
        }
      });
      return this.tokeninfo.length;
    } catch (e) {
      logger.error("[TokenManager] Err:", e);
      return false;
    }
  }
  public getList() {
    return this.tokeninfo;
  }
}
