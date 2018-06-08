import * as React from 'react';
import {addStyle, removeStyle} from "./style";

export interface ComponentProps {
  display: React.ReactNode,
  failback: React.ReactNode,
  fragment?: boolean
}

export class FlexibleRender extends React.PureComponent<ComponentProps> {
  componentDidMount() {
    addStyle();
  }

  componentWillUnmount() {
    removeStyle();
  }

  render() {
    const nodes = [
      <span key="failback" className="react-reflexible-failback" aria-hidden>{this.props.failback}</span>,
      <span key="try" className="react-reflexible-try">{this.props.display}</span>,
    ];

    return (
      this.props.fragment
        ? nodes
        : <span className="react-reflexible" children={nodes}/>
    );
  }
}

export const Reoptional: React.SFC = ({children}) => (
  <span className="react-reflexible-failback" aria-hidden>{children}</span>
);

const OptionalType = (<Reoptional/>).type;

const derefence = (children: React.ReactNode): React.ReactNode => {
  return React.Children.map(children, (child: React.ReactNode) => {
    if (child && typeof child === 'object' && 'type' in child && child.type === OptionalType) {
      return React.createElement('span', {}, derefence(child.props.children));
    }
    return child
  });
};

const findOptional = (children: React.ReactNode): React.ReactNode[] => {
  return React.Children.map(children, (child: React.ReactNode) => {
    if (child && typeof child === 'object' && 'type' in child && child.type === OptionalType) {
      return child;
    }
    return null
  }).filter(Boolean);
};

const derefenceOnce = (children: React.ReactNode): React.ReactNode => {
  const result: React.ReactNode[] = [];
  React.Children.forEach(children, (child: React.ReactNode) => {
    if (child && typeof child === 'object' && 'type' in child && child.type === OptionalType) {
      if (child.props.children) {
        result.push(...[findOptional(child.props.children)])
      }
    }
  });
  return result.length ? result : null;
};

class SpreadReflexible extends React.PureComponent {
  render(): React.ReactNode {
    const display: React.ReactNode[] = [];
    const failback: React.ReactNode[] = [];
    let hasFailback = false;

    React.Children.forEach(
      this.props.children,
      child => {
        if (typeof child === 'object' && child.type === OptionalType) {
          display.push(React.createElement('span', {}, derefence(child.props.children)));
          const failbackElements = findOptional(child.props.children);
          if (failbackElements && failbackElements.length) {
            failback.push(...failbackElements);//React.cloneElement(child, {}, failbackElements));
          }
          hasFailback = true;
        } else {
          display.push(child);
          failback.push(child);
        }
      }
    );
    if (!hasFailback) {
      return display;
    }

    return (
      <FlexibleRender
        display={display}
        failback={<SpreadReflexible children={failback.filter(Boolean)}/>}
      />
    )
  }
}

export const Reflexible: React.SFC = ({children}) => (
  <SpreadReflexible>
    {children}
  </SpreadReflexible>
);

export const FlexiblePick: React.SFC<{ try: React.ReactNode[] }> = (props): any => (
  props.try.reduceRight(
    (acc: React.ReactNode, item: React.ReactNode): React.ReactNode => (
      acc
        ? <FlexibleRender
          display={item}
          failback={acc}
        />
        : item
    ),
    null)
);