import React from 'react';
import './Navbar.scss';
import DFSMaze from './../MazePatterns/DFSMaze';
import StairPattern from './../MazePatterns/StairPattern';
import BinaryTreeMaze from './../MazePatterns/BinaryTreeMaze';
import KruskalMaze from './../MazePatterns/KruskalMaze';
import RecursiveDivision from './../MazePatterns/RecursiveDivision';

const navbar=
({setVisualize,turnOff,setAlgorithmType,visualizeAlgorithm,clearGrid,randomGrid,
    setTurnOff,clearPath,visualize,grid,start,
    end,mazeType,setMazeType,fillWalls,setWallsOrWeights,setShowTutorialModel})=>{

    const onAlgoChange=(e)=>{
        // storing the selsected algorithm
        setAlgorithmType(e.target.value);
    }

    const onVisualize=()=>{
        //Upon Clicking the visualize button
        setVisualize(true);
        setTurnOff(true);
        visualizeAlgorithm();
    }

    const onRandromGrid=()=>{
        setVisualize(true);
        setTurnOff(true);
        randomGrid();
    }

    const showMaze=async(visitedNodesInOrder)=>{
        // It converts the cells css classes in the order they are visited by the algorithm
        for(let i=0;i<=visitedNodesInOrder.length;i++){
            if(i===visitedNodesInOrder.length){
                await new Promise((done) => setTimeout(() => done(), 10)); //To slow down the animation
                setTurnOff(false);
                setMazeType("none");
                return ;
            }
            const node=visitedNodesInOrder[i];
            if((node[0]!==end[0]||node[1]!==end[1])&&(node[0]!==start[0]||node[1]!==start[1])){
                await new Promise((done) => setTimeout(() => done(), 10)); //To slow down the animation
                document.getElementById(`node-${node[0]}-${node[1]}`).className=`grid-cells`;
            }
        }
    }

    const onPatternChange=async(e)=>{
        // upon selecting a maze
        if(e.target.value==="none") return;
        setTurnOff(true);
        setMazeType(e.target.value);
        if(e.target.value==="stair") {
            clearGrid();
            await StairPattern(start,end,grid);
            setTurnOff(false);
            setMazeType("none");
        }
        else if(e.target.value==="dfs_maze") {
            fillWalls();
            await new Promise((done) => setTimeout(() => done(), 10)); //To slow down the animation
            let visitedNodesInOrder=[];
            DFSMaze(start,end,grid,visitedNodesInOrder);
            showMaze(visitedNodesInOrder);
        }else if(e.target.value==="binary_maze"){
            fillWalls();
            await new Promise((done) => setTimeout(() => done(), 10)); //To slow down the animation
            let visitedNodesInOrder=[];
            BinaryTreeMaze(grid,visitedNodesInOrder);
            showMaze(visitedNodesInOrder);
        }else if(e.target.value==="kruskal_maze"){
            fillWalls();
            await new Promise((done) => setTimeout(() => done(), 10)); //To slow down the animation
            let visitedNodesInOrder=[];
            KruskalMaze(grid,visitedNodesInOrder);
            showMaze(visitedNodesInOrder);
        }else if(e.target.value==="recursive"){
            clearGrid();
            await RecursiveDivision(start,end,grid);
            setTurnOff(false);
            setMazeType("none");
        }
    }

    const onWallChange=(e)=>{
        setWallsOrWeights(e.target.value);
    }

    return (
        <nav className="content-header">
            <select
                className="content-header__select"
                onChange={onAlgoChange}
                id="algorithm"
                disabled={turnOff}
                style={{width:"120px"}}
            >
                <option value="BFS" > BFS </option>
                <option value="DFS"> DFS </option>
                <option value="DIJKSTRA"> Dijkstra</option>
            </select>
            <button 
                className="content-header__button"
                onClick={randomGrid}
                disabled={turnOff}
                type="button"
            >
                Random Grid
            </button>
            <button
                className="content-header__visualize"
                onClick={onVisualize}
                disabled={turnOff}
                type="button"
            > 
                Visualize!
            </button>
            <button 
                className="content-header__button"
                onClick={clearGrid}
                disabled={turnOff}
                type="button"
            >
                Clear Grid
            </button>
            <button
                className="content-header__button"
                onClick={clearPath}
                disabled={visualize||mazeType!=="none"}
                type="button"
            >
                Clear Path
            </button>
            {/* <button
                className="content-header__tutorial"
                onClick={()=>setShowTutorialModel(true)}
                disabled={turnOff}
                type="button"
            >
                Dark Mode
            </button> */}
        </nav>
    );
}

export default navbar;