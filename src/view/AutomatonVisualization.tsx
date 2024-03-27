import React, { useEffect, useRef } from 'react';
import { Data, Edge, Network, Node, Options } from 'vis-network/peer';
import { DataSet } from 'vis-data/peer';
import { TimedAutomaton } from '../model/ta/timedAutomaton';
import { ClockConstraint } from '../model/ta/clockConstraint';

interface VisualizationProps {
  ta: TimedAutomaton;
  // Define any props your component might take, such as data for nodes and edges
}

const AutomatonVisualization: React.FC<VisualizationProps> = (props) => {
  const { ta } = props;
  const networkRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (networkRef.current) {
      const nodes = new DataSet<Node>();
      const edges = new DataSet<Edge>();

      ta.locations.forEach((location, index) => {
        const label = `${location.name}${location.invariant ? `\n${formatClockConstraint(location.invariant)}` : ''}`;
        nodes.add({
          id: `${index}`,
          label,
        });
      });

      ta.switches.forEach((sw) => {
        const fromIndex = ta.locations.indexOf(sw.source);
        const toIndex = ta.locations.indexOf(sw.target);
        const label = `${sw.action.name}${sw.guard ? `\n${formatClockConstraint(sw.guard)}` : ''}\n{ ${sw.reset.map((clock) => clock.name).join(', ')} }`;

        edges.add({
          id: `FROM${fromIndex}TO${toIndex}`,
          from: `${fromIndex}`,
          to: `${toIndex}`,
          label,
        });
      });

      // Provide the data and configuration to the network
      const data: Data = {
        nodes: nodes,
        edges: edges,
      };
      const options: Options = {
        nodes: {
          shape: 'box',
          color: {
            background: 'white',
            border: 'black',
          },
        },
        edges: {
          color: 'gray',
          arrows: {
            to: { enabled: true, type: 'arrow' },
          },
        },
        physics: {
          enabled: false,
        },
      };

      new Network(networkRef.current, data, options);
    }
  }, [ta.locations, ta.switches]);

  return <div ref={networkRef} style={{ width: '100%', height: '100%' }} />;
};

function formatClockConstraint(constraint: ClockConstraint): string {
  return `${constraint.lhs.name} ${constraint.op} ${constraint.rhs}`;
}

export default AutomatonVisualization;
