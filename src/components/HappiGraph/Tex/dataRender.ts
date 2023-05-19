import { rawTexData } from "./mockTexData";

  export const texMockData = {
    nodes: [
      ...Object.keys(rawTexData.typeExplorer.entities).map((e) => {
        return {
          id: rawTexData.typeExplorer.entities[e].entityDef.guid,
          label: e,
          group: "Port",
          guid: rawTexData.typeExplorer.entities[e].entityDef.guid,
          tex: {
            entityType: "OpenMetadataRoot",
            desciption: {
              "Description": "Common root for all open metadata entity types.",
              "Type Status": "ACTIVE_TYPEDEF",
              "Attributes": "list is empty",
              "Relationships": "none",
              "Classifications ": "",
            },
            extras: {
              "Anchors": "",
              "Memento": "",
            },
          },
        };
      }),
    ],
    edges: [
      ...Object.keys(rawTexData.typeExplorer.entities)
        .filter((e) => {
          if (rawTexData.typeExplorer.entities[e].entityDef.superType) {
            return true;
          } else {
            return false;
          }
        })
        .map((e) => {
          return {
            id: `${rawTexData.typeExplorer.entities[e].entityDef.guid}-${rawTexData.typeExplorer.entities[e].entityDef.superType.guid}`,
            to: rawTexData.typeExplorer.entities[e].entityDef.guid,
            from: rawTexData.typeExplorer.entities[e].entityDef.superType.guid,
            label: "Label",
            type: null,
          };
        }),
    ],
  };