/**
 * Renders the plain-text legal copy from content.ts as semantic HTML.
 * - Lines starting with "N." or "A./B./C." become <h2>
 * - Lines starting with "- " become <ul><li>
 * - The first line becomes <h1>
 * - Other lines become <p>
 */
interface Props {
  text: string;
}

const isHeading = (line: string) =>
  /^\d+\.\s/.test(line) || /^[A-Z]\.\s/.test(line);

const LegalText = ({ text }: Props) => {
  const lines = text.split("\n");
  const blocks: JSX.Element[] = [];
  let listBuffer: string[] = [];
  let key = 0;

  const flushList = () => {
    if (listBuffer.length) {
      blocks.push(
        <ul key={`ul-${key++}`}>
          {listBuffer.map((item, i) => (
            <li key={i}>{item.replace(/^-\s*/, "")}</li>
          ))}
        </ul>,
      );
      listBuffer = [];
    }
  };

  lines.forEach((raw, idx) => {
    const line = raw.trimEnd();

    if (line.startsWith("- ")) {
      listBuffer.push(line);
      return;
    }
    flushList();

    if (line === "") {
      return;
    }

    if (idx === 0) {
      blocks.push(<h1 key={`h-${key++}`}>{line}</h1>);
      return;
    }

    if (isHeading(line)) {
      blocks.push(<h2 key={`h-${key++}`}>{line}</h2>);
      return;
    }

    blocks.push(<p key={`p-${key++}`}>{line}</p>);
  });

  flushList();

  return <>{blocks}</>;
};

export default LegalText;
