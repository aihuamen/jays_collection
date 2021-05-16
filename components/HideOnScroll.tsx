import { Slide, useScrollTrigger } from "@material-ui/core";

interface Props {
  window: () => Window;
  children: React.ReactElement;
}

const HideOnScroll = ({ window, children }: Props) => {
  const trigger = useScrollTrigger({ target: window ? window() : undefined });

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
};

export default HideOnScroll;
