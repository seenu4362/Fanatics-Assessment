import Head from "next/head";
interface MetaHeadProps {
    title: string;
    description?: string;
    keywords?: string;
    ogTitle?: string;
    ogDescription?: string;
    ogImage?: string;
    twitterCard?: string;
    twitterTitle?: string;
    twitterDescription?: string;
    twitterImage?: string;
}
const MetaHead = ({
    title,
    description,
    keywords,
    ogTitle,
    ogDescription,
    ogImage,
    twitterCard = "summary_large_image",
    twitterTitle,
    twitterDescription,
    twitterImage,
}: MetaHeadProps) => (
    <Head>
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
        {keywords && <meta name="keywords" content={keywords} />}
        <meta name="robots" content="index, follow" />
        {ogTitle && <meta property="og:title" content={ogTitle} />}
        {ogDescription && <meta property="og:description" content={ogDescription} />}
        {ogImage && <meta property="og:image" content={ogImage} />}
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content={twitterCard} />
        {twitterTitle && <meta name="twitter:title" content={twitterTitle} />}
        {twitterDescription && <meta name="twitter:description" content={twitterDescription} />}
        {twitterImage && <meta name="twitter:image" content={twitterImage} />}
    </Head>
);

export default MetaHead;
