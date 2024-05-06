type NewsParams = {
  query: string;
  source?:
    | typeof TheGuardianHandler.ID
    | typeof NewYorkTimesHandler.ID
    | typeof NewsAPIHandler.ID;
  fromDate?: string;
  categories?: string;
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

  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async fetchNews(params: NewsParams) {
    const news = await fetch(
      `${TheGuardianHandler.BASE_URL}?${new URLSearchParams(params)}`
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

class NewsService {
  private handlers: Map<string, INewsHandler>;

  constructor() {
    this.handlers = new Map<string, INewsHandler>();
    this.handlers.set(TheGuardianHandler.ID, new TheGuardianHandler("abc"));
    this.handlers.set(NewYorkTimesHandler.ID, new NewYorkTimesHandler("abc"));
    this.handlers.set(NewsAPIHandler.ID, new NewsAPIHandler("abc"));
  }

  async fetchNews(params: NewsParams): Promise<News[]> {
    const handlers = params.source
      ? [this.handlers.get(params.source)]
      : Array.from(this.handlers.values());

    const fetchPromises = handlers.map((handler?: INewsHandler) =>
      handler?.fetchNews(params)
    );
    const results = await Promise.all(fetchPromises);

    return results.reduce((acc = [], curr, idx) => {
      const handler = handlers[idx];
      const normalizedNews = handler?.processNews(curr!) as News[];
      acc.push(...normalizedNews);
      return acc;
    }, [] as News[]) as News[];
  }
}
