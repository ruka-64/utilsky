import { logger } from "comodern";

export class FetchAPI {
  public ready: boolean;
  public hostname: string | null;
  constructor() {
    this.ready = false;
    this.hostname = null;
  }
  private urlBuilder(path: string, params?: Record<string, string>) {
    const query = params ? "?" + new URLSearchParams(params).toString() : "";
    return `https://${this.hostname}${path}${query}`;
  }
  public async awaitReady() {
    if (!this.ready) {
      await new Promise((_) => setTimeout(_, 1000));
      await this.awaitReady();
    } else {
      return true;
    }
  }
  public init(hostname: string) {
    if (this.ready) {
      logger.warn("[FetchAPI] Already initialized!");
      return false;
    }
    this.hostname = hostname;
    this.ready = true;
    logger.info("[FetchAPI] Initialized!");
    return true;
  }
  public async POST(
    path: string,
    token?: string,
    body?: Record<string, string>
  ) {
    if (!this.ready) await this.awaitReady();
    const url = this.urlBuilder(path);
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...body,
        i: token,
      }),
    });
    if (res.ok) {
      //* no content
      if (res.status === 204) {
        return {
          success: true,
          status: res.status,
          data: null,
        };
      }

      //* parse result
      const data = await res.json();
      return {
        success: true,
        status: res.status,
        data: data,
      };
    } else {
      if (res.headers.get("content-type")?.includes("application/json")) {
        const data = await res.json();
        return {
          success: false,
          status: res.status,
          data: data,
        };
      }

      return {
        success: false,
        status: res.status,
        data: null,
      };
    }
  }
}

export const fetchAPI = new FetchAPI();
