import { MovieCard } from "./MovieCard";
import { ColumnSizer, Grid, GridCellRenderer } from "react-virtualized";
import { Header } from "./Header";

interface ContentProps {
  selectedGenre: {
    id: number;
    name: "action" | "comedy" | "documentary" | "drama" | "horror" | "family";
    title: string;
  };

  movies: Array<{
    imdbID: string;
    Title: string;
    Poster: string;
    Ratings: Array<{
      Source: string;
      Value: string;
    }>;
    Runtime: string;
  }>;
}

export function Content({ selectedGenre, movies }: ContentProps) {
  const rowRenderer: GridCellRenderer = ({ key, style, columnIndex }) => {
    return (
      <div className="movies-list" key={key} style={style}>
        <MovieCard movie={movies[columnIndex]} />
      </div>
    );
  };

  return (
    <div className="container">
      <Header title={selectedGenre.title} />

      <main style={{ width: "100%", height: "100%" }}>
        <ColumnSizer
          columnMaxWidth={1000}
          columnMinWidth={1000}
          columnCount={3}
          width={1000}
        >
          {({ adjustedWidth, getColumnWidth, registerChild }) => (
            <Grid
              ref={registerChild}
              columnWidth={getColumnWidth}
              columnCount={3}
              cellRenderer={rowRenderer}
              height={1000}
              rowCount={3}
              rowHeight={400}
              width={adjustedWidth}
            />
          )}
        </ColumnSizer>
      </main>
    </div>
  );
}
