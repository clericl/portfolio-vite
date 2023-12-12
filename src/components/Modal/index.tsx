import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  MouseEvent,
  ReactNode,
} from "react";
import { useSpring, animated, easings } from "@react-spring/web";
import { useMediaQuery } from "../../utils/useMediaQuery";
import classNames from "classnames";

import moethennessy from "../../assets/projects/moethennessy.mp4";
import rosewrapped from "../../assets/projects/rosewrapped.mp4";
import kennethcole from "../../assets/projects/kennethcole.mp4";
import arbor from "../../assets/projects/arbor.mp4";
import treeline from "../../assets/projects/treeline.mp4";

import email from "../../assets/contact/email.png";
import github from "../../assets/contact/github.png";
import linkedin from "../../assets/contact/linkedin.png";
import resume from "../../assets/contact/resume.png";
import { ICONS } from "../../utils/constants";

import "./index.scss";

type Modals = {
  [key: string]: {
    title: ReactNode;
    video?: string;
    text: ReactNode;
  };
};

export const ModalContext = createContext({
  modalOpen: false,
  modalType: "",
  openModal: (_key: string) => {},
  closeModal: () => {},
});

export function ModalController({ children }: ModalControllerProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");

  const openModal = useCallback((key: string) => {
    setModalOpen(true);
    setModalType(key);
  }, []);

  const closeModal = useCallback(() => {
    setModalOpen(false);
  }, []);

  const value = useMemo(
    () => ({
      modalOpen,
      modalType,
      openModal,
      closeModal,
    }),
    [modalOpen, modalType, openModal, closeModal],
  );

  return (
    <ModalContext.Provider value={value}>{children}</ModalContext.Provider>
  );
}

interface ModalControllerProps {
  children: ReactNode;
}

function Modal() {
  const { closeModal, modalOpen, modalType, openModal } =
    useContext(ModalContext);
  const isDesktop = useMediaQuery("(min-width:768px)");
  const [backgroundSprings, backgroundApi] = useSpring(() => ({
    opacity: 0,
    pointerEvents: "none",
  }));
  const [contentSprings, contentApi] = useSpring(() => ({
    opacity: 0,
  }));

  const MODALS: Modals = useMemo(
    () => ({
      about: {
        title: "About",
        text: [
          <div key={1} className="body">
            <p className="modal-text">
              I'm Eric, a full stack web developer specializing in 3D and
              augmented reality experiences. Thanks for stopping by, and check
              out this website on a desktop browser to see even more fun
              details!
            </p>
          </div>,
        ],
      },
      skills: {
        title: "Skills",
        text: [
          <div key={1} className="body">
            <p className="modal-subheader">Front End</p>
            <p className="modal-text skinny">HTML, CSS, JavaScript, React.js</p>
            <p className="modal-subheader">Back End</p>
            <p className="modal-text skinny">
              TypeScript, SQL, Amazon Web Services, Google Cloud Platform
            </p>
            <p className="modal-subheader">3D and Data Visualization</p>
            <p className="modal-text skinny">
              D3.js, Three.js, A-FRAME, 8th Wall
            </p>
          </div>,
        ],
      },
      work: {
        title: "Selected work",
        text: [
          <div key={1} className="body">
            <div
              className="modal-link-over-banner"
              onClick={() => openModal("moethennessy")}
            >
              <video
                className="modal-banner"
                src={moethennessy}
                autoPlay={false}
                playsInline
                muted
                style={{ objectPosition: "left 68%" }}
              />
              <p className="modal-link">Moët-Hennessy Concierge Experience</p>
            </div>
            <div
              className="modal-link-over-banner"
              onClick={() => openModal("kennethcole")}
            >
              <video
                className="modal-banner"
                src={kennethcole}
                autoPlay={false}
                playsInline
                muted
                style={{ objectPosition: "left 29%" }}
              />
              <p className="modal-link">Kenneth Cole Instagram Filter</p>
            </div>
            <div
              className="modal-link-over-banner"
              onClick={() => openModal("rosewrapped")}
            >
              <video
                className="modal-banner"
                src={rosewrapped}
                autoPlay={false}
                playsInline
                muted
                style={{ objectPosition: "left 29%" }}
              />
              <p className="modal-link">ROSE Wrapped 2022</p>
            </div>
            <div
              className="modal-link-over-banner"
              onClick={() => openModal("arbor")}
            >
              <video
                className="modal-banner"
                src={arbor}
                autoPlay={false}
                playsInline
                muted
                style={{ objectPosition: "left 25%" }}
              />
              <p className="modal-link">Arbor</p>
            </div>
            <div
              className="modal-link-over-banner"
              onClick={() => openModal("treeline")}
            >
              <video
                className="modal-banner"
                src={treeline}
                autoPlay={false}
                playsInline
                muted
                style={{ objectPosition: "left 25%" }}
              />
              <p className="modal-link">Treeline NYC</p>
            </div>
          </div>,
        ],
      },
      contact: {
        title: "Contact",
        text: [
          <div key={1} className="body">
            <p className="modal-text">
              I'm currently open to work! I'm especially interested in building
              immersive web experiences to highlight cutting-edge, impactful,
              and democratized technologies.
            </p>
            <div className="block">
              <div
                className="modal-link-over-banner half"
                onClick={() => ICONS[0].invoke()}
              >
                <img className="modal-banner" src={email} alt="email" />
                <p className="modal-link">Email</p>
              </div>
              <div
                className="modal-link-over-banner half"
                onClick={() => ICONS[1].invoke()}
              >
                <img className="modal-banner" src={github} alt="github" />
                <p className="modal-link">GitHub</p>
              </div>
              <div
                className="modal-link-over-banner half"
                onClick={() => ICONS[2].invoke()}
              >
                <img className="modal-banner" src={linkedin} alt="linkedin" />
                <p className="modal-link">LinkedIn</p>
              </div>
              <div
                className="modal-link-over-banner half"
                onClick={() => ICONS[3].invoke()}
              >
                <img
                  className="modal-banner"
                  src={resume}
                  alt="download resume"
                />
                <p className="modal-link">Download Resume</p>
              </div>
            </div>
          </div>,
        ],
      },
      moethennessy: {
        title: "Moët-Hennessy Concierge Experience",
        video: moethennessy,
        text: [
          <div key={1} className="body">
            <p className="modal-text">
              In a partnership with creative agency Admerasia, we at ROSE
              developed an augmented reality experience for Moët-Hennessy's
              Concierge, a campaign highlighting top-shelf spirits and champagne
              under the Moët-Hennessy umbrella. This AR experience placed a
              virtual beverage expert in the user's environment to engage the
              user with a series of questions, identifying the bottle best
              suited to the user's personality type.
            </p>
            <p className="modal-text">
              Try it{" "}
              <a
                href="https://www.8thwall.com/rosedigital/moethennessy-concierge"
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>
              .
            </p>
          </div>,
        ],
      },
      kennethcole: {
        title: "Kenneth Cole Instagram Filter",
        video: kennethcole,
        text: [
          <div key={1} className="body">
            <p className="modal-text">
              As part of a multi-pronged augmented reality strategy, we at ROSE
              developed both web and social media app-based experiences to
              support the opening of Kenneth Cole's newest real-world store in
              SoHo, New York City. Shown here is the Instagram filter we created
              to place dynamic campaign slogans in the user's environment.
            </p>
          </div>,
        ],
      },
      rosewrapped: {
        title: "ROSE Wrapped 2022",
        video: rosewrapped,
        text: [
          <div key={1} className="body">
            <p className="modal-text">
              To cap off another successful year at ROSE, we assembled campaign
              footage and statistics from the projects we completed to create a
              snappy highlight reel. Featured were projects for Bloomingdale's,
              Selfridges, Miami Design District, Mastercard, BET+, and more.
            </p>
            <p className="modal-text">
              Check it out{" "}
              <a
                href="https://wrapped.builtbyrose.co/"
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>
              .
            </p>
          </div>,
        ],
      },
      arbor: {
        title: "Arbor",
        video: arbor,
        text: [
          <div key={1} className="body">
            <p className="modal-text">
              Arbor is an etymology-finding tool that traces the ancestors of a
              given word and then recursively finds related words that stem from
              each ancestor. This personal project was inspired by my background
              in linguistics, my interest in data visualization, and the
              invaluable community-gathered resources collected in spaces like
              Wiktionary.
            </p>
            <p className="modal-text">
              Try it{" "}
              <a
                href="https://arbor.ericliang.dev"
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>
              .
            </p>
          </div>,
        ],
      },
      treeline: {
        title: "Treeline NYC",
        video: treeline,
        text: [
          <div key={1} className="body">
            <p className="modal-text">
              New York City currently boasts over 900,000 trees planted in its streets, parks,
              and other public places, with representatives from almost 600 different species
              and cultivars. I used data published by the Department of Parks and Recreation
              to build this project, which maps each one of these trees. Treeline NYC is made
              for all sorts of nature enthusiasts, amateur arborists, and people who are simply
              curious about a different face of this great city to learn about and explore the
              jungle that thrives amid the concrete.
            </p>
            <p className="modal-text">
              Try it{" "}
              <a
                href="https://treeline.ericliang.dev"
                target="_blank"
                rel="noopener noreferrer"
              >
                here
              </a>
              .
            </p>
          </div>,
        ],
      },
    }),
    [openModal],
  );

  const contentToDisplay = useMemo(
    () => MODALS[modalType],
    [modalType, MODALS],
  );
  const isWorkPanel = useMemo(
    () =>
      modalType === "moethennessy" ||
      modalType === "kennethcole" ||
      modalType === "rosewrapped" ||
      modalType === "arbor",
    [modalType],
  );

  const handleClose = useCallback(
    (e: MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) closeModal();
    },
    [closeModal],
  );

  const handleCloseButton = useCallback(() => {
    if (isDesktop) {
      closeModal();
    } else if (isWorkPanel) {
      openModal("work");
    } else {
      closeModal();
    }
  }, [closeModal, isDesktop, isWorkPanel, openModal]);

  useEffect(() => {
    backgroundApi.start({
      opacity: modalOpen ? 1 : 0,
      pointerEvents: modalOpen ? "all" : "none",
      delay: modalOpen ? 0 : 200,
      config: {
        duration: 200,
        easing: easings.easeOutQuad,
      },
    });

    contentApi.start({
      opacity: modalOpen ? 1 : 0,
      delay: modalOpen ? 300 : 0,
      config: {
        duration: 200,
        easing: easings.easeOutQuad,
      },
    });
  }, [backgroundApi, contentApi, modalOpen]);

  return (
    contentToDisplay && (
      <animated.div
        className="modal"
        onClick={handleClose}
        // @ts-expect-error who knows
        style={backgroundSprings}
      >
        <animated.div
          className={classNames("modal-contents", { "has-video": isWorkPanel })}
          style={contentSprings}
        >
          <div className="modal-details">
            <h2 className="modal-title">{contentToDisplay.title}</h2>
            {contentToDisplay.text}
          </div>
          {contentToDisplay.video && (
            <div className="modal-media">
              <video
                src={contentToDisplay.video}
                muted
                loop
                autoPlay
                playsInline
              />
            </div>
          )}
          <div className="close-button" onClick={handleCloseButton}>
            <button>
              <span className="material-symbols-outlined">
                {isWorkPanel && !isDesktop ? "arrow_back" : "close"}
              </span>
            </button>
          </div>
        </animated.div>
      </animated.div>
    )
  );
}

export default Modal;
