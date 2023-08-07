/*
 * @Author: 倪航天
 * @Date: 2023-08-07 23:33:13
 * @LastEditTime: 2023-08-07 23:41:05
 * @LastEditors: 倪航天
 * @Description: Grid 合并
 */

import { Row, Col, RowProps, ColProps, } from 'antd';

const Grid: React.FC<{ type?: "Row" | "Col" } & RowProps & ColProps> = ({ type, children, ...props }) => {

    switch (type) {
        case "Col":
            return <Col {...props}>{children}</Col>;
        case "Row":
            return <Row {...props}>{children}</Row>

        default:
            return <>{children}</>
    }

}

export default Grid;