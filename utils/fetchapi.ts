export class FetchAPI {
  private token: string[] | null;
  public ready: boolean;
  public hostname: string | null;
  constructor() {
    this.ready = false;
    this.token = null;
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
  public init(token: string[], hostname: string) {
    this.token = token;
    this.hostname = hostname;
    this.ready = true;
  }
  public async POST(path: string, body: Record<string, string>) {
    if (!this.ready) await this.awaitReady();
    const url = this.urlBuilder(path);
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...body,
        i: this.token,
      }),
    });
    if (res.ok) {
      //* no content
      if (res.status === 204) {
        return {
          success: true,
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
