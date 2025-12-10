import { Helmet } from "react-helmet-async";
import ProjectCard, { type ProjectCardProps } from "../../components/ProjectCard";
import { motion } from "framer-motion";
import PageTransition from "../../components/PageTransition";
import PageHeader from "../../components/PageHeader";
import BackgroundEffects from "../../components/BackgroundEffects";

export const projectsData: ProjectCardProps[] = [
    {
        slug: "land-delineation-training",
        title: "Land Delineation Training",
        description: "Deep learning model training pipeline for delineating land from satellite imagery. Features preprocessing, BsiNet model implementation, and custom loss functions.",
        techStack: ["Python", "PyTorch", "GDAL", "OpenCV", "TensorBoard"],
        links: [],
        status: "in-progress",
        visibility: "private",
        image: "/assets/deliniation.jpg",
        date: "2025",
        details: [
            "Developed a deep learning pipeline for land delineation using BsiNet architecture.",
            "Implemented preprocessing modules using GDAL for satellite imagery (GeoTIFF) handling, including normalization, mask binarization, and resampling.",
            "Created a custom PyTorch dataset loader handling images, masks, contours, and distance maps.",
            "Defined and implemented custom loss functions including Dice Loss, Focal Loss, and a combined LossBsiNet.",
            "Set up a training loop with TensorBoard logging for monitoring model performance.",
            "Built a testing script to generate binary masks from model predictions and save them as GeoTIFFs."
        ]
    },
    {
        slug: "geomap-dashboard-client",
        title: "Geomap Dashboard Client",
        description: "Comprehensive Next.js application for visualizing fertilizer distribution. Features interactive maps with Deck.gl, vector tiles, and dynamic data filtering.",
        techStack: ["Next.js", "React", "Deck.gl", "Tailwind CSS", "Daisy UI", "Chart.js", "Bun"],
        links: [],
        status: "in-progress",
        visibility: "private",
        image: "/assets/dashboard-geomap-client.png",
        date: "2025",
        featured: true,
        details: [
            "Built a responsive dashboard using Next.js 16 and Bun runtime.",
            "Integrated Deck.gl for high-performance interactive map visualizations with custom vector tiles.",
            "Implemented dynamic coloring for fertilizer data (Urea, NPK, Organik) based on tonnage.",
            "Developed advanced search functionality with auto-fly to regions (Province, Regency, District).",
            "Created detailed popup summaries and sidebar controls for data filtering and aggregation.",
            "Designed a modern UI with Tailwind CSS v4 and DaisyUI v5, supporting dark/light modes."
        ]
    },
    {
        slug: "geomap-dashboard-service",
        title: "Dashboard Geomap Service",
        description: "High-performance backend service for the Geomap Dashboard. Handles data ingestion, geospatial queries, and serves aggregated fertilizer data.",
        techStack: ["Go", "Fiber", "PostgreSQL", "PostGIS", "Docker", "Python"],
        links: [],
        status: "in-progress",
        visibility: "private",
        image: "https://placehold.co/600x400/0ea5e9/ffffff?text=Geomap+Service",
        date: "2025",
        details: [
            "Developed a REST API using Go and Fiber v3 for high performance.",
            "Utilized PostgreSQL with PostGIS for efficient geospatial data storage and querying.",
            "Implemented data ingestion scripts in Python to process CSV and shapefiles.",
            "Created endpoints for aggregated fertilizer needs data at National, Provincial, Regency, and District levels.",
            "Containerized the application using Docker for easy deployment.",
            "Implemented Clean Architecture principles for maintainability and scalability."
        ]
    },
    {
        slug: "yield-forecasting",
        title: "Yield Forecasting",
        description: "Predicted crop yield using satellite imagery (Sentinel-2) and ground truth data. Applied classical ML models (RF, XGBoost, LightGBM) and deep learning models (LSTM, GRU) with transfer learning.",
        techStack: ["Python", "Google Earth Engine", "LightGBM", "LSTM", "Sentinel-2"],
        links: [
            {
                label: "GitHub",
                url: "https://github.com/adityavhlvy/yield-prediction"
            }
        ],
        status: "completed",
        visibility: "public",
        image: "/assets/yield-prediction.png",
        date: "2025",
        featured: true,
        details: [
            "Predicted crop yield using satellite imagery (Sentinel-2) and ground truth data.",
            "Collected and preprocessed data from East and West Java (2020–2021).",
            "Applied classical ML models (RF, XGBoost, LightGBM) and deep learning models (LSTM, GRU).",
            "Implemented transfer learning for the Lampung region to improve prediction accuracy.",
            "Achieved region-specific yield predictions with improved accuracy.",
            "Gained skills in integrating geospatial data with ML/DL models and remote sensing analysis."
        ]
    },
    {
        slug: "weird-weather-translator",
        title: "Weird Weather Translator",
        description: "Web app turning real-time weather into absurd, funny one-liners. Collected data via Open-Meteo API, generated text with Meta-LLama-3-8B Instruct.",
        techStack: ["Vue 3", "Tailwind CSS", "Daisy UI", "Node.js", "Express", "GPT4All"],
        links: [
            {
                label: "Github",
                url: "https://github.com/adityavhlvy/weird-weather-translator"
            }
        ],
        status: "completed",
        visibility: "public",
        image: "/assets/weird-weather-translator.png",
        date: "2025",
        featured: true,
        details: [
            "Developed a web app that turns real-time weather into absurd, funny one-liners.",
            "Collected weather data via Open-Meteo API.",
            "Generated creative text using Meta-LLama-3-8B Instruct (GPT4All).",
            "Built the frontend with Vue 3, Tailwind CSS, and Daisy UI.",
            "Implemented the backend using Node.js and Express.",
            "Focused on LLM integration in web apps and playful UX design."
        ]
    },
    {
        slug: "ngeles-api",
        title: "Ngeles API",
        description: "A simple API inspired by “No as a Service” that serves categorized and random pantun (poems). Built with Express.js.",
        techStack: ["Express.js", "Node.js", "JSON"],
        links: [
            {
                label: "Github",
                url: "https://github.com/adityavhlvy/ngeles-API"
            }
        ],
        status: "completed",
        visibility: "public",
        image: "https://placehold.co/600x400/f59e0b/ffffff?text=Ngeles+API",
        date: "2025",
        details: [
            "Developed a simple API inspired by “No as a Service” to serve pantun (poems).",
            "Built endpoints for categorized (/ngeles/:kategori) and random (/ngeles/random) pantun.",
            "Stored data in a local JSON file for lightweight data handling.",
            "Tested functionality to ensure fast and structured access to data.",
            "Gained skills in RESTful API design, endpoint management, and backend development."
        ]
    },
    {
        slug: "zero-shot-classification-twitter",
        title: "Zero-Shot Classification on Twitter Data",
        description: "Implemented a Zero-Shot Classification pipeline for Indonesian tweets. Preprocessed text (cleaning, slang normalization), translated to English using Deep Translator, and classified into 8 categories (e.g., Politics, Economy) using the tasksource/deberta-small-long-nli model.",
        techStack: ["Python", "Pandas", "NLTK", "Hugging Face", "DeBERTa", "Deep Translator"],
        links: [
            {
                label: "Github",
                url: "https://github.com/adityavhlvy/Zero-Shot-Classification-for-Tweeter"
            }
        ],
        status: "completed",
        visibility: "public",
        image: "/assets/zero-shot-classification.png",
        date: "2025",
        details: [
            "Implemented a Zero-Shot Classification pipeline for Indonesian tweets.",
            "Preprocessed text including cleaning, slang normalization, and removal of special characters.",
            "Translated tweets to English using Deep Translator (Google Translate API).",
            "Classified tweets into 8 categories (e.g., Politics, Economy) using the tasksource/deberta-small-long-nli model.",
            "Utilized Python, Pandas, NLTK, and Hugging Face libraries.",
            "Demonstrated capability in NLP pipelines without labeled training data."
        ]
    },
    {
        slug: "chatbot-rag",
        title: "Chatbot with RAG – PDF Q&A",
        description: "Chatbot that answers questions from uploaded PDF documents. Implemented RAG with Chroma DB and LaMini-Flan-T5 model.",
        techStack: ["Python", "Streamlit", "Chroma DB", "RAG", "LangChain"],
        links: [
            {
                label: "https://github.com/adityavhlvy/chatbot-rag",
                url: "https://github.com/adityavhlvy/chatbot-rag"
            }
        ],
        status: "completed",
        visibility: "public",
        image: "/assets/chatbot-rag.jpg",
        date: "2024",
        details: [
            "Built a chatbot that answers questions from uploaded PDF documents with conversation memory.",
            "Implemented data ingestion and embedding generation using sentence-transformers.",
            "Used Chroma DB for vector storage and retrieval.",
            "Implemented RAG (Retrieval-Augmented Generation) with the LaMini-Flan-T5-783M model.",
            "Deployed a Streamlit app with an admin interface for document management.",
            "Gained skills in RAG workflow, embeddings, vector search, and NLP deployment."
        ]
    },
    {
        slug: "social-media-sentiment",
        title: "Social Media Sentiment Analysis",
        description: "Analyzed Twitter (X) and YouTube comments from the 2024 Vice Presidential debate to extract sentiment and topic trends.",
        techStack: ["Python", "NLP", "Topic Modeling", "Data Visualization"],
        links: [],
        status: "completed",
        visibility: "public",
        image: "/assets/sentiment-analysis.png",
        date: "2024",
        details: [
            "Analyzed Twitter (X) and YouTube comments from the 2024 Vice Presidential debate.",
            "Collected and cleaned social media data for analysis.",
            "Performed sentiment analysis to gauge public opinion.",
            "Conducted topic modeling to identify key discussion themes.",
            "Visualized results to extract sentiment and topic trends.",
            "Learned cross-platform social media analysis and interpreting public opinion."
        ]
    },
    {
        slug: "anemia-classification",
        title: "Anemia Classification - CNN",
        description: "CNN model to classify anemia from labeled eye-bag images. Performed EDA, image preprocessing, and model training.",
        techStack: ["Python", "TensorFlow", "CNN", "Computer Vision"],
        links: [],
        status: "completed",
        visibility: "public",
        image: "/assets/anemia.png",
        date: "2024",
        details: [
            "Built a CNN model to classify anemia from labeled eye-bag images.",
            "Performed exploratory data analysis (EDA) on the dataset.",
            "Implemented image preprocessing techniques for better model performance.",
            "Trained and evaluated the CNN model, achieving high accuracy.",
            "Analyzed misclassified images to understand model limitations.",
            "Gained experience in medical image analysis and deep learning with TensorFlow."
        ]
    },
    {
        slug: "figma-prototype",
        title: "Desa Wisata Alamendah Prototype",
        description: "Interactive web app prototype for a tourism village. Designed UI components and consistent design system in Figma.",
        techStack: ["Figma", "UI/UX Design", "Prototyping"],
        links: [],
        status: "completed",
        visibility: "public",
        image: "/assets/alamendah.png",
        date: "2024",
        details: [
            "Designed an interactive web app prototype for Desa Wisata Alamendah using Figma.",
            "Planned and implemented UI components following component-based principles.",
            "Established a consistent design system including fonts, colors, and spacing.",
            "Created interactive screens to simulate user navigation and functionality.",
            "Delivered a functional prototype ready for development.",
            "Gained skills in interaction design, visual hierarchy, and web application prototyping."
        ]
    }
];


export default function Projects() {
    return (
        <PageTransition className="container mx-auto max-w-6xl p-6 relative min-h-screen">
            <Helmet>
                <title>Projects by Aditya Vahlevy Nugraha | Web Dev, AI & ML Portfolio</title>
                <meta name="description" content="Explore the portfolio of Aditya Vahlevy Nugraha. Featuring projects in Fullstack Web Development (Next.js, Go, React) and Machine Learning (Deep Learning, NLP)." />
                <meta name="keywords" content="Aditya Vahlevy Nugraha Projects, Portfolio, Web Development, Machine Learning, AI, Software Engineering, Case Studies" />
                <meta property="og:title" content="Projects by Aditya Vahlevy Nugraha | Web Dev, AI & ML Portfolio" />
                <meta property="og:description" content="Explore the portfolio of Aditya Vahlevy Nugraha. Featuring projects in Fullstack Web Development and Machine Learning." />
                <meta property="og:url" content="https://kuraninja.vercel.app/projects" />
            </Helmet>

            {/* Extended Background */}
            <BackgroundEffects />

            <div className="relative z-10">
                <PageHeader
                    title="My Work"
                    description={
                        <>
                            Here's a collection of what I've been building. From <span className="font-bold text-primary">enterprise dashboards</span> to <span className="font-bold text-accent">weird AI experiments</span>.
                            I believe code should either be useful or fun (ideally both).
                        </>
                    }
                    accentColor="secondary"
                />

                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ staggerChildren: 0.15 }}
                >
                    {projectsData.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true, margin: "-50px" }}
                            transition={{ duration: 0.6 }}
                            className="h-full"
                        >
                            <ProjectCard {...project} />
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </PageTransition>
    );
}
