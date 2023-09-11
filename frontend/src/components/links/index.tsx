import DiscordIcon from "../../assets/icons/discord.svg";
import GoogleIcon from "../../assets/icons/google.svg";
import PolygonIcon from "../../assets/icons/polygon.svg";
import { DISCORD_URL, GOOGLE_URL } from "../../config";
import Button from "../button";

export const DiscordAuthLink = () => {
    return (
        <a href={DISCORD_URL}>
            <Button variant="ghost" className="w-full">
                <img
                    src={DiscordIcon}
                    alt="Connect with discord"
                    className="mr-3"
                />
                Connect with discord
            </Button>{" "}
        </a>
    );
};

export const PolygonAuthLink = ({ onClick }: { onClick: () => void }) => {
    return (
        <Button variant="ghost" className="w-full" onClick={onClick}>
            <img
                src={PolygonIcon}
                alt="Connect with polygonId"
                title="Connect with polygonId"
                className="mr-3"
            />
            Connect with polygonId
        </Button>
    );
};

export const GoogleAuthLink = () => {
    return (
        <a href={GOOGLE_URL}>
            <Button variant="ghost" className="w-full  ">
                <img
                    src={GoogleIcon}
                    alt="Connect with google"
                    className="mr-3"
                />
                Connect with google
            </Button>
        </a>
    );
};
