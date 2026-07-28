declare const _default: () => {
    port: number;
    database: {
        url: string | undefined;
    };
    jwt: {
        secret: string;
        expiresIn: string;
        refreshSecret: string;
        refreshExpiresIn: string;
    };
    cloudflare: {
        accountId: string | undefined;
        accessKeyId: string | undefined;
        secretAccessKey: string | undefined;
        bucketName: string;
        publicUrl: string | undefined;
    };
    cors: {
        origins: string[];
    };
};
export default _default;
