export class FetchAPI {
  private token: string[];
  public hostname: string;
  constructor(token: string[], hostname: string) {
    this.token = token;
    this.hostname = hostname;
  }
  private urlBuilder(path: string, params?: Record<string, string>) {
    const query = params ? "?" + new URLSearchParams(params).toString() : "";
    return `https://${this.hostname}${path}${query}`;
  }
  public async POST(path: string, body: Record<string, string>) {
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
