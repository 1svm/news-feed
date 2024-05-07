type NewsParams = {
  query: string;
  fromDate?: string;
  category?: string;
};

type News = {
  source: string;
  title: string;
  description: string;
  thumbnail: string;
  author: string;
  age: string;
};

interface INewsHandler {
  fetchNews(params: NewsParams): Promise<unknown[]>;
  processNews(news: any[]): News[];
}

class TheGuardianHandler implements INewsHandler {
  static ID = "THE_GUARDIAN" as const;
  static BASE_URL = "https://content.guardianapis.com/search";
  static PARAMS_MAP: Record<string, string> = {
    query: "q",
    fromDate: "from-date",
    categories: "section",
  };

  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  mapParams(params: NewsParams) {
    return Object.entries(params).reduce((acc, [key, value]) => {
      const mappedKey = TheGuardianHandler.PARAMS_MAP[key];
      if (mappedKey) {
        acc[mappedKey] = value;
      }
      return acc;
    }, {} as Record<string, string>);
  }

  async fetchNews(params: NewsParams) {
    return fetch(
      `${
        TheGuardianHandler.BASE_URL
      }?show-fields=thumbnail,body&show-tags=contributor&order-by=relevance&api-key=${
        this.apiKey
      }&${new URLSearchParams(this.mapParams(params))}`
    ).then((res) => res.json());
  }

  processNews(news: any): News[] {
    return news.response.results.map((article: any) => ({
      title: article?.webTitle,
      description: article?.fields?.body,
      thumbnail: article?.fields?.thumbnail,
      author: article?.tags?.find((tag: any) => tag?.type === "contributor")
        ?.webTitle,
      age: article?.webPublicationDate,
      source: TheGuardianHandler.ID,
    }));
  }
}

class NewYorkTimesHandler implements INewsHandler {
  static ID = "NEW_YORK_TIMES" as const;
  static BASE_URL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";

  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async fetchNews(params: NewsParams) {
    const news = await fetch(
      `${NewYorkTimesHandler.BASE_URL}?${new URLSearchParams(params)}`
    );
    return news.json();
  }

  processNews(news: any[]) {
    return news.map((article: any) => ({
      title: article.webTitle,
      description: article.webTitle,
      thumbnail: article.fields.thumbnail,
      author: article.webTitle,
      age: article.webPublicationDate,
      source: NewYorkTimesHandler.ID,
    }));
  }
}

class NewsAPIHandler implements INewsHandler {
  static ID = "NEWS_API" as const;
  static BASE_URL = "https://newsapi.org/v2/everything";

  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async fetchNews(params: NewsParams) {
    const news = await fetch(
      `${NewsAPIHandler.BASE_URL}?${new URLSearchParams(params)}`
    );
    return news.json();
  }

  processNews(news: any[]) {
    return news.map((article: any) => ({
      title: article.webTitle,
      description: article.webTitle,
      thumbnail: article.fields.thumbnail,
      author: article.webTitle,
      age: article.webPublicationDate,
      source: NewYorkTimesHandler.ID,
    }));
  }
}

export class NewsService {
  private handlers: Map<string, INewsHandler>;

  constructor({
    theGuardianApiKey,
    newYorkTimesApiKey,
    newsApiKey,
  }: {
    theGuardianApiKey: string;
    newYorkTimesApiKey: string;
    newsApiKey: string;
  }) {
    this.handlers = new Map<string, INewsHandler>();
    this.handlers.set(
      TheGuardianHandler.ID,
      new TheGuardianHandler(theGuardianApiKey)
    );
    this.handlers.set(
      NewYorkTimesHandler.ID,
      new NewYorkTimesHandler(newYorkTimesApiKey)
    );
    this.handlers.set(NewsAPIHandler.ID, new NewsAPIHandler(newsApiKey));
  }

  async fetchNews(url: string): Promise<News[]> {
    const { source, params } = this.constructParams(url);
    // const handlers = source
    //   ? [this.handlers.get(source)]
    //   : Array.from(this.handlers.values());
    const handlers = [this.handlers.get(TheGuardianHandler.ID)];

    const fetchPromises = handlers.map((handler?: INewsHandler) =>
      handler?.fetchNews(params)
    );

    return Promise.all(fetchPromises).then((results) => {
      return results.reduce((acc = [], curr, idx) => {
        const handler = handlers[idx];
        const normalizedNews = handler?.processNews(curr!) as News[];
        acc.push(...normalizedNews);
        return acc;
      }, []) as News[];
    });
  }

  constructParams(url: string) {
    const urlObject = new URL(url);
    const source = urlObject.searchParams.get("source");
    urlObject.searchParams.delete("source");
    const params: Record<string, string> = {};
    for (const [key, value] of urlObject.searchParams) {
      if (value) {
        params[key] = value;
      }
    }

    return {
      source,
      params: params as NewsParams,
    };
  }
}
