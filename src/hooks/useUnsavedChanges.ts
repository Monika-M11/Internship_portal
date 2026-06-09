"use client";

import {
  useEffect,
} from "react";

type Props = {
  hasUnsavedChanges: boolean;
};

export default function useUnsavedChanges({
  hasUnsavedChanges,
}: Props) {

  useEffect(() => {

    const handleBeforeUnload = (
      e: BeforeUnloadEvent
    ) => {

      if (!hasUnsavedChanges)
        return;

      e.preventDefault();

      e.returnValue = "";
    };

    window.addEventListener(
      "beforeunload",
      handleBeforeUnload
    );

    return () => {

      window.removeEventListener(
        "beforeunload",
        handleBeforeUnload
      );
    };

  }, [hasUnsavedChanges]);
}