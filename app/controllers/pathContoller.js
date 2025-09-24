const pathModel = require('../models/pathModel');
let PF = require('pathfinding');

/* findPath */
exports.findPath = (req, res) => {
    try {
        let pathObject = pathModel.newModel(req);

        // 입력 검증
        if (!pathObject.grid || !Array.isArray(pathObject.grid)) {
            return res.status(400).json(funcCmmn.getReturnMessage({
                isErr: true,
                resultData: null,
                message: "Invalid grid data"
            }));
        }

        let {
            startX = 0,
            startY = 0,
            endX = 0,
            endY = 0,
            gridWidth = 0,
            gridHeight = 0
        } = pathObject;
        // 문자열 → 숫자 변환
        startX = Number(startX) || 0;
        startY = Number(startY) || 0;
        endX   = Number(endX)   || 0;
        endY   = Number(endY)   || 0;
        gridWidth  = Number(gridWidth)  || 0;
        gridHeight = Number(gridHeight) || 0;

        // 좌표 유효성 검사
        if (startX < 0 || startX >= gridWidth || startY < 0 || startY >= gridHeight || endX < 0 || endX >= gridWidth || endY < 0 || endY >= gridHeight) {
            return res.status(400).json(funcCmmn.getReturnMessage({
                isErr: true,
                resultData: null,
                message: "Invalid coordinates"
            }));
        }

        // 시작점과 목표점이 장애물인지 확인
        if (pathObject.grid[startY][startX] === 1 || pathObject.grid[endY][endX] === 1) {
            return res.status(400).json(funcCmmn.getReturnMessage({
                isErr: true,
                resultData: null,
                message: "시작점이나 목표점이 장애물입니다."
            }));
        }

        // 성능 측정 시작
        const startTime = Date.now();

        // 그리드 클론 (원본 보호)
        let grid = new PF.Grid(pathObject.grid.map(row => [...row]));
        let finder = new PF.JumpPointFinder();
        let path = finder.findPath(startX, startY, endX, endY, grid);

        const executionTime = Date.now() - startTime;

        // 결과 반환
        res.json(funcCmmn.getReturnMessage({
            resultData: {
                success: path.length > 0,
                path: path,
                algorithm: "JPS",
                executionTime: executionTime,
                pathLength: path.length,
                gridSize: `${gridWidth}x${gridHeight}`
            },
            resultCnt: path.length
        }));

    } catch (error) {
        console.error('Pathfinding error:', error);
        res.status(500).json(funcCmmn.getReturnMessage({
            isErr: true,
            resultData: null,
            message: "Internal server error"
        }));
    }
};