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
  public ready: boolean;
  public tokens: string[] | null;
  public tokeninfo: TokenInfo[];
  constructor() {
    this.ready = false;
    this.tokens = null;
    this.tokeninfo = [];
  }
  /** @returns alive token length or false */
  public async Init(tokens: string[]) {
    this.tokens = tokens;
    this.ready = true;
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
      logger.log("[TokenManager] Ready.");
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

export const tokenmanager = new TokenManager();
