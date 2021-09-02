import progress from "cli-progress";

export const bar = (label, start, total) => {
  const opt = {
    format: label + "[{bar}] {percentage}% | {value}/{total}",
  };
  const bar = new progress.SingleBar(opt, progress.Presets.shades_classic);
  bar.start(total, start);
  return bar;
};
