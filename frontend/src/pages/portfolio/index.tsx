import React from "react";
import Layout from "../layout";
import PortfolioSection from "@/components/sections/portfolio";
import { useLocation, useParams } from "react-router-dom";
import { useAppSelector } from "@/redux/hooks";

const Portfolio = ({
    setActiveState,
}: {
    setActiveState: React.Dispatch<React.SetStateAction<number>>;
}) => {
    const location = useLocation();
    const { user } = useAppSelector((state) => state.auth);
    const search = location.search;
    const turf_id = search.split("=")[1];
    if (turf_id) {
        return (
            <PortfolioWrapper
                turf_id={turf_id}
                setActiveState={setActiveState}
            />
        );
    } else if (user && user.turf_id) {
        return (
            <PortfolioWrapper
                turf_id={user.turf_id}
                setActiveState={setActiveState}
            />
        );
    }
    return null;
};

export default Portfolio;

const PortfolioWrapper = ({
    turf_id,
    setActiveState,
}: {
    turf_id: string;
    setActiveState: React.Dispatch<React.SetStateAction<number>>;
}) => {
    React.useEffect(() => {
        window.scrollTo(0, 0);
    }, []);
    return (
        <Layout>
            <PortfolioSection
                turf_id={turf_id}
                setActiveState={setActiveState}
            />
        </Layout>
    );
};
