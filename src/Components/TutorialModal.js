import React from 'react';
import Modal from 'react-modal';
import './TutorialModal.scss';

const tutorialModal=({showTutorialModal,setShowTutorialModel})=>{
    return(
        // all the props are already provided in the modal component
        <Modal
            className="tutorial-modal"
            isOpen={showTutorialModal}
            contentLabel="Example Modal"
            onRequestClose={()=>setShowTutorialModel(false)}
        >
            <p className="tutorial-modal__usage">
                <h1>Welcome to Pathfinding Visualizer!</h1>
                <div className="tutorial-modal__row">
                    <h2>At its core, a pathfinding algorithm seeks to find the shortest path between two points. This application visualizes various pathfinding algorithms in action, and more!</h2>
                </div>
                <div className="tutorial-modal__row">
                    <h2>Breath-first Search (unweighted): a great algorithm; guarantees the shortest path</h2>
                </div>
                <div className="tutorial-modal__row">
                    <h2>Depth-first Search (unweighted): a very bad algorithm for pathfinding; does not guarantee the shortest path</h2>
                </div>
                <div className="tutorial-modal__row">
                    <h2>Just above the grid you can read the information about the currently selected pathfinding algorithm.</h2>
                </div>
                <div className="tutorial-modal__row">
                    <h2>The position of start and end node could be change by clicking and than dragging them.</h2>
                </div>
            </p>
            <button onClick={()=>setShowTutorialModel(false)} className="tutorial-modal__close" type="button">
                X
            </button>
        </Modal>
        
    );
};

export default tutorialModal;