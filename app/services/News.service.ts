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

export type HandlerID =
  | typeof TheGuardianHandler.ID
  | typeof NewYorkTimesHandler.ID
  | typeof NewsOrgHandler.ID;

export class TheGuardianHandler implements INewsHandler {
  static ID = "THE_GUARDIAN" as const;
  static BASE_URL = "https://content.guardianapis.com/search";
  static PARAMS_MAP: Record<keyof NewsParams, string> = {
    query: "q",
    fromDate: "from-date",
    category: "section",
  };
  static CATEGORY_MAP: Record<string, string[]> = {
    business: ["business"],
    entertainment: ["music"],
    health: ["wellness"],
    science: ["science"],
    sports: ["sport"],
    technology: ["technology"],
  };

  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  mapParams(params: NewsParams) {
    return Object.entries(params).reduce((acc, [key, value]) => {
      const mappedKey = TheGuardianHandler.PARAMS_MAP[key as keyof NewsParams];
      if (mappedKey) {
        if (key === "fromDate") {
          if (value === "LAST_7") {
            acc[mappedKey] = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
              .toISOString()
              .split("T")[0];
          }
          if (value === "LAST_15") {
            acc[mappedKey] = new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
              .toISOString()
              .split("T")[0];
          }
          if (value === "LAST_30") {
            acc[mappedKey] = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
              .toISOString()
              .split("T")[0];
          }
        } else if (key === "category") {
          const category = TheGuardianHandler.CATEGORY_MAP[value];
          if (category) {
            acc[mappedKey] = category.join(",");
          }
        } else {
          acc[mappedKey] = value;
        }
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
      description: (article?.fields?.body || "").substring(0, 200),
      thumbnail: article?.fields?.thumbnail,
      author: article?.tags?.find((tag: any) => tag?.type === "contributor")
        ?.webTitle,
      age: article?.webPublicationDate,
      source: TheGuardianHandler.ID,
    }));
  }
}

export class NewYorkTimesHandler implements INewsHandler {
  static ID = "NEW_YORK_TIMES" as const;
  static BASE_URL = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
  static PARAMS_MAP: Record<keyof NewsParams, string> = {
    query: "q",
    fromDate: "fq",
    category: "fq",
  };
  static CATEGORY_MAP: Record<string, string[]> = {
    business: ["Business Day"],
    entertainment: ["arts", "movies", "theater"],
    health: ["health", "well"],
    science: ["science", "climate", "space", "energy", "environment"],
    sports: ["sports", "football", "basketball", "baseball"],
    technology: [
      "technology",
      "personaltech",
      "gadgets",
      "apps",
      "internet",
      "games",
    ],
  };

  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  mapParams(params: NewsParams) {
    return Object.entries(params).reduce((acc, [key, value]) => {
      const mappedKey = NewYorkTimesHandler.PARAMS_MAP[key as keyof NewsParams];
      if (mappedKey) {
        if (key === "fromDate") {
          if (value === "LAST_7") {
            acc[mappedKey] = `pub_date:("${
              new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                .toISOString()
                .split("T")[0]
            }")`;
          }
          if (value === "LAST_15") {
            acc[mappedKey] = `pub_date:("${
              new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
                .toISOString()
                .split("T")[0]
            }")`;
          }
          if (value === "LAST_30") {
            acc[mappedKey] = `pub_date:("${
              new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
                .toISOString()
                .split("T")[0]
            }")`;
          }
        } else if (key === "category") {
          const category = NewYorkTimesHandler.CATEGORY_MAP[value];
          if (category) {
            acc[mappedKey] = `section_name:("${category.join('","')}")`;
          }
        } else {
          acc[mappedKey] = value;
        }
      }
      return acc;
    }, {} as Record<string, string>);
  }

  async fetchNews(params: NewsParams) {
    return fetch(
      `${
        NewYorkTimesHandler.BASE_URL
      }?fl=abstract,lead_paragraph,source,pub_date,multimedia&sort=relevance&api-key=${
        this.apiKey
      }&${new URLSearchParams(this.mapParams(params))}`
    ).then((res) => res.json());
  }

  processNews(news: any): News[] {
    return (news?.response?.docs ?? []).map((article: any) => {
      const thumbnail = article?.multimedia?.find(
        (m: any) => m.type === "image"
      )?.url;
      return {
        title: article?.abstract,
        description: (article?.lead_paragraph || "").substring(0, 200),
        thumbnail: thumbnail
          ? `https://www.nytimes.com/${thumbnail}`
          : undefined,
        author: article?.source ?? "The New York Times",
        age: article?.pub_date,
        source: NewYorkTimesHandler.ID,
      };
    });
  }
}

export class NewsOrgHandler implements INewsHandler {
  static ID = "NEWS_ORG" as const;
  static BASE_URL = "https://newsapi.org/v2/everything";
  static PARAMS_MAP: Record<keyof NewsParams, string> = {
    query: "q",
    fromDate: "from",
    category: "",
  };
  static CATEGORY_MAP: Record<string, string[]> = {
    business: ["business", "economy", "finance"],
    entertainment: ["entertainment", "celebrity", "movies", "music"],
    health: ["health", "wellness", "fitness", "nutrition"],
    science: ["science", "technology", "research", "innovation"],
    sports: ["sports", "football", "basketball", "baseball"],
    technology: ["technology", "gadgets", "apps", "internet"],
  };

  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  mapParams(params: NewsParams) {
    return Object.entries(params).reduce((acc, [key, value]) => {
      const mappedKey = NewsOrgHandler.PARAMS_MAP[key as keyof NewsParams];
      if (mappedKey) {
        if (key === "fromDate") {
          if (value === "LAST_7") {
            acc[mappedKey] = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
              .toISOString()
              .split("T")[0];
          }
          if (value === "LAST_15") {
            acc[mappedKey] = new Date(Date.now() - 15 * 24 * 60 * 60 * 1000)
              .toISOString()
              .split("T")[0];
          }
          if (value === "LAST_30") {
            acc[mappedKey] = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)
              .toISOString()
              .split("T")[0];
          }
        } else {
          acc[mappedKey] = value;
        }
      }
      return acc;
    }, {} as Record<string, string>);
  }

  async fetchNews(params: NewsParams) {
    return fetch(
      `${NewsOrgHandler.BASE_URL}?${new URLSearchParams(
        this.mapParams(params)
      )}pageSize=10&sortBy=popularity&sources=google-news&apiKey=${this.apiKey}`
    ).then((res) => res.json());
  }

  processNews(news: any): News[] {
    return news.articles.map((article: any) => {
      return {
        title: article?.title,
        description: (article?.description || "").substring(0, 200),
        thumbnail: article?.urlToImage,
        author: article?.author ?? "News Org",
        age: article?.publishedAt,
        source: NewsOrgHandler.ID,
      };
    });
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
    this.handlers.set(NewsOrgHandler.ID, new NewsOrgHandler(newsApiKey));
  }

  async fetchNews(url: string): Promise<News[]> {
    const { source, params } = this.constructParams(url);
    const handlers = source
      ? [this.handlers.get(source)]
      : Array.from(this.handlers.values());

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
