"use client";
import Link from 'next/link';
import { useParams } from 'next/navigation';
import Button from '~/app/(site)/components/forms/Button';
import React, { useMemo, useContext } from 'react';
import { MOCK_ASSETS } from '~/app/(site)/core/constants/mock_assets';
import { EditorContext } from '~/app/(site)/core/providers/EditorProvider';
import AssetTextEditor from '~/app/(site)/components/AssetTextEditor';

function AssetEditorPage() {
  const params = useParams();
  const { texts, setting, handleRevert } = useContext(EditorContext);

  const asset = useMemo(() => {
    if (params.id) {
      return MOCK_ASSETS.find((item) => item.id === params.id);
    }
    return null;
  }, [params]);

  const shadowEffectStyle = useMemo(() => {
    if (setting.effects.enable) {
      return {
        boxShadow: `0px 0px ${setting.effects.opacity / 0.8}px ${setting.effects.opacity}px ${setting.effects.color}`
      }
    }

    return {}
  }, [setting.effects]);

  const outlineStyle = useMemo(() => {
    if (setting.outline.enable) {
      return {
        borderWidth: `${setting.outlineThickness}px`,
        borderStyle: 'solid',
        borderColor: setting.outline.color,
      }
    }

    return {}
  }, [setting.outline, setting.outlineThickness]);

  const appearanceStyle = useMemo(() => {
    if (setting.fill.enable) {
      return {
        overlay: {
          backgroundColor: setting.fill.color,
          opacity: setting.appearance / 100,
        },
        image: {
          opacity: 1,
        },
      }
    } else {
      return {
        overlay: {},
        image: {
          opacity: setting.appearance / 100,
        },
      }
    }
  }, [setting.fill, setting.appearance]);

  if (!asset) return null;

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 text-sm text-grey-800 -mt-4">
        <Link href="/marketing">
          <p>Marketing Communication Assets</p>
        </Link>
        <span className="font-bold">{`>`}</span>
        <p className="font-bold">Editor</p>
      </div>
      <div className="flex justify-between gap-6">
        <div>
          <h2 className="text-2xl font-bold text-grey-800">Editor</h2>
          <p className="text-sm font-semibold text-grey-800">
            Here you can edit your marketing and communication assets. You can edit each as you like, you can make changes you want to apply to all assets, and/or download to your own editing program for more advanced editing. When you are done you can share them.
          </p>
        </div>
        <Button
          className="bg-white flex-shrink-0"
          color="grey"
          variant="outline"
          onClick={handleRevert}
        >
          Revert to original
        </Button>
      </div>

      <div className="flex-1 flex justify-center items-center my-5 max-w-[900px] w-full mx-auto">
        <div className="overflow-hidden relative">
          <div
            id="asset-editor"
            style={{
              ...outlineStyle,
              ...appearanceStyle.image,
            }}
          >
            <div className="relative z-10">
              {texts.map(({ id, ...rest }, index) => (
                <AssetTextEditor key={index} id={id} {...rest} />
              ))}
            </div>
            <img
              src={`/assets/images/${asset.image}`}
              alt="man"
              width={700}
              height={700}
              style={shadowEffectStyle}
            />
          </div>
          <div
            className="absolute top-0 left-0 right-0 bottom-0"
            style={appearanceStyle.overlay}
          />
        </div>
      </div>
    </div>
  )
}

export default AssetEditorPage;
