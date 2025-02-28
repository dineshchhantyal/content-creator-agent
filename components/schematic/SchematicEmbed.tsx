"use client";

import React from "react";
import { SchematicEmbed as S } from "@schematichq/schematic-components";

const SchematicEmbed = ({
  accessToken,
  componentId,
}: {
  accessToken: string;
  componentId: string;
}) => {
  return <S accessToken={accessToken} id={componentId} />;
};

export default SchematicEmbed;
