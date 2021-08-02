import React from "react";
import { POPULARITY_DESC, SCORE_DESC } from "../../interfaces/seiyuu";
import { useRouter } from "next/router";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";

interface ISeiyuuSelect {
  setLoad: React.Dispatch<React.SetStateAction<boolean>>;
}

const SeiyuuSelect: React.FC<ISeiyuuSelect> = ({ setLoad }) => {
  const router = useRouter();
  const params = new URLSearchParams(router.asPath.split("?")[1]);

  const setParams = (type: string, value: string) => {
    setLoad(true);
    params.set(type, value);
    router.push("?" + params.toString(), "?" + params.toString(), {
      scroll: false,
    });
  };

  return (
    <Grid container justify="space-evenly" style={{ width: "100%" }}>
      <FormControl>
        <FormLabel>Select Top</FormLabel>
        <RadioGroup
          row
          value={router.query.t ?? "10"}
          onChange={(e) => {
            setParams("t", e.target.value);
          }}
        >
          <FormControlLabel value="5" control={<Radio />} label="5" />
          <FormControlLabel value="10" control={<Radio />} label="10" />
          <FormControlLabel value="20" control={<Radio />} label="20" />
        </RadioGroup>
      </FormControl>

      <FormControl>
        <FormLabel>Rank By</FormLabel>
        <RadioGroup
          row
          value={router.query.r ?? SCORE_DESC}
          onChange={(e) => {
            setParams("r", e.target.value);
          }}
        >
          <FormControlLabel
            value={SCORE_DESC}
            control={<Radio />}
            label="Score"
          />
          <FormControlLabel
            value={POPULARITY_DESC}
            control={<Radio />}
            label="Popularity"
          />
        </RadioGroup>
      </FormControl>
    </Grid>
  );
};

export default SeiyuuSelect;
