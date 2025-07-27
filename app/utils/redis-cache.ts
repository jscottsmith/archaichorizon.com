// Redis cache utility for production environments

// Optional Redis import - will only work if @upstash/redis is installed
let Redis: any = null;
try {
  Redis = require("@upstash/redis").Redis;
} catch (error) {
  console.warn(
    "@upstash/redis not installed, Redis cache will not be available"
  );
}

// Fallback implementation if Redis is not configured
class RedisCache {
  private redis: any = null;

  constructor() {
    // Only initialize if Redis is available and environment variables are set
    if (
      Redis &&
      process.env.UPSTASH_REDIS_REST_URL &&
      process.env.UPSTASH_REDIS_REST_TOKEN
    ) {
      try {
        this.redis = new Redis({
          url: process.env.UPSTASH_REDIS_REST_URL,
          token: process.env.UPSTASH_REDIS_REST_TOKEN,
        });
      } catch (error) {
        console.warn(
          "Redis initialization failed, falling back to memory cache:",
          error
        );
      }
    }
  }

  async set<T>(key: string, data: T, ttl: number = 3600): Promise<void> {
    if (!this.redis) {
      throw new Error("Redis not configured");
    }

    try {
      await this.redis.setex(key, ttl, JSON.stringify(data));
    } catch (error) {
      console.error("Redis set error:", error);
      throw error;
    }
  }

  async get<T>(key: string): Promise<T | null> {
    if (!this.redis) {
      throw new Error("Redis not configured");
    }

    try {
      const data = await this.redis.get(key);
      return data ? JSON.parse(data as string) : null;
    } catch (error) {
      console.error("Redis get error:", error);
      return null;
    }
  }

  async delete(key: string): Promise<boolean> {
    if (!this.redis) {
      throw new Error("Redis not configured");
    }

    try {
      const result = await this.redis.del(key);
      return result > 0;
    } catch (error) {
      console.error("Redis delete error:", error);
      return false;
    }
  }

  async exists(key: string): Promise<boolean> {
    if (!this.redis) {
      throw new Error("Redis not configured");
    }

    try {
      const result = await this.redis.exists(key);
      return result === 1;
    } catch (error) {
      console.error("Redis exists error:", error);
      return false;
    }
  }

  isAvailable(): boolean {
    return this.redis !== null;
  }
}

export const redisCache = new RedisCache();
