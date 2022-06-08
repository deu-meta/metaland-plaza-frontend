export type { IMinecraftAccount };

type IMinecraftAccount = {
    id: string;
    provider: 'java' | 'bedrock';
    display_name: string;
};
