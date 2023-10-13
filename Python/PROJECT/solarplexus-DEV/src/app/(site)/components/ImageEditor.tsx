import React, { ChangeEvent, useContext, useMemo } from 'react';
import Image from 'next/image';
import Select from '~/app/(site)/components/forms/Select';
import Input from '~/app/(site)/components/forms/Input';
import CheckBox from '~/app/(site)/components/forms/CheckBox';
import ColorPicker from '~/app/(site)/components/forms/ColorPicker';
import RangeValue from '~/app/(site)/components/RangeValue';
import { FONT_FAMILY, FONT_STYLE } from '~/app/(site)/core/constants';
import { EditorContext } from '~/app/(site)/core/providers/EditorProvider';
import clsx from 'clsx';

const ImageEditor = () => {
  const {
    setting,
    handleChangeFieldValue,
    handleCreateTextElement,
    handleChangeTextElement,
    activeText,
    texts,
  } = useContext(EditorContext);

  const activeElement = useMemo(() => {
    return texts.find((item) => item.id === activeText);
  }, [activeText, texts]);

  return (
    <div className="p-12">
      <div className="flex justify-between mb-7">
        <h3 className="text-2xl font-bold">Text</h3>
        <button
          className="gap-2 flex items-center text-xl font-bold text-info rounded border-2 border-info h-10 px-5"
          onClick={handleCreateTextElement}
        >
          <Image src="/assets/images/icons/text_type_icon.svg" width={21} height={21} alt="text_type" />
          Add Text
        </button>
      </div>

      <div id="toolbar">
        <Select
          disabled={!activeText}
          className="w-full"
          items={FONT_FAMILY}
          value={activeElement?.fontFamily}
          onChange={(event: ChangeEvent<HTMLSelectElement>) => {
            handleChangeTextElement({ id: activeText ?? '', fontFamily: event.target.value });
          }}
        />
        <div className="flex gap-6 mt-5 mb-10">
          <Select
            disabled={!activeText}
            className="flex-1"
            items={FONT_STYLE}
            value={activeElement?.fontStyle}
            onChange={(event: ChangeEvent<HTMLSelectElement>) => {
              handleChangeTextElement({ id: activeText ?? '', fontStyle: event.target.value });
            }}
          />
          <Input
            disabled={!activeText}
            className="!h-10 border-grey-400 rounded-[10px] text-center !min-w-[130px] w-[130px] text-xl"
            type="number"
            value={activeElement?.fontSize ?? '60'}
            onChange={(event) => {
              handleChangeTextElement({ id: activeText ?? '', fontSize: event.target.value });
            }}
          />
          <div className={clsx('h-10 flex rounded-[10px] border border-grey-400', !activeText && 'pointer-event-none opacity-70')}>
            <button onClick={() => handleChangeTextElement({ id: activeText ?? '', textAlign: 'left' })}>
              <Image
                className={clsx('mx-2 cursor-pointer invert', activeElement?.textAlign === 'left' && 'invert-0')}
                src="/assets/images/icons/align_left_icon.svg"
                width={24}
                height={24}
                alt="left"
              />
            </button>
            <button onClick={() => handleChangeTextElement({ id: activeText ?? '', textAlign: 'center' })}>
              <Image
                className={clsx('mx-2 cursor-pointer invert', activeElement?.textAlign === 'center' && 'invert-0')}
                src="/assets/images/icons/align_center_icon.svg"
                width={24}
                height={24}
                alt="center"
              />
            </button>
            <button onClick={() => handleChangeTextElement({ id: activeText ?? '', textAlign: 'right' })}>
              <Image
                className={clsx('mx-2 cursor-pointer invert', activeElement?.textAlign === 'right' && 'invert-0')}
                src="/assets/images/icons/align_right_icon.svg"
                width={24}
                height={24}
                alt="right"
              />
            </button>
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-4">Appearance</h3>
        <RangeValue
          min={0}
          max={100}
          value={setting.appearance}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            handleChangeFieldValue('appearance', event.target.value);
          }}
        />

        <div className="flex gap-14 pt-9 mb-7">
          <div className="flex gap-4 items-center">
            <CheckBox
              size="lg"
              checked={setting.fill.enable}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                handleChangeFieldValue('fill',
                  {
                    enable: event.target.checked,
                    color: setting.fill.color
                  }
                );
              }}
            />
            <ColorPicker
              value={setting.fill.color}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                handleChangeFieldValue('fill',
                  {
                    enable: setting.fill.enable,
                    color: event.target.value
                  }
                );
              }}
            />
            <span className="text-2xl">Fill</span>
          </div>

          <div className="flex gap-4 items-center">
            <CheckBox
              size="lg"
              checked={setting.outline.enable}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                handleChangeFieldValue('outline',
                  {
                    enable: event.target.checked,
                    color: setting.outline.color
                  }
                );
              }}
            />
            <ColorPicker
              value={setting.outline.color}
              onChange={(event: ChangeEvent<HTMLInputElement>) => {
                handleChangeFieldValue('outline',
                  {
                    enable: setting.outline.enable,
                    color: event.target.value
                  }
                );
              }}
            />
            <span className="text-2xl">Outline</span>
          </div>
        </div>

        <h3 className="text-2xl font-bold mb-4">Outline thickness</h3>
        <RangeValue
          className="mb-8"
          min={0}
          max={100}
          value={setting.outlineThickness}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            handleChangeFieldValue('outlineThickness', event.target.value);
          }}
        />

        <h3 className="text-2xl font-bold mb-4">Effects</h3>
        <div className="flex gap-4 items-center mb-5">
          <CheckBox
            size="lg"
            checked={setting.effects.enable}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              handleChangeFieldValue('effects',
                {
                  enable: event.target.checked,
                  color: setting.effects.color,
                  opacity: setting.effects.opacity,
                }
              );
            }}
          />
          <ColorPicker
            value={setting.effects.color}
            onChange={(event: ChangeEvent<HTMLInputElement>) => {
              handleChangeFieldValue('effects',
                {
                  enable: setting.effects.enable,
                  color: event.target.value,
                  opacity: setting.effects.opacity,
                }
              );
            }}
          />
          <span className="text-2xl">Drop shadow</span>
        </div>
        <RangeValue
          className="mb-10"
          min={0}
          max={100}
          value={setting.effects.opacity}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            handleChangeFieldValue('effects', {
              enable: setting.effects.enable,
              color: setting.effects.color,
              opacity: event.target.value,
            });
          }}
        />

        <CheckBox
          size="lg"
          label="Apply changes to all assets in project"
          labelClassName="text-2xl gap-4 text-primary font-semibold"
          checked={setting.applyAll}
          onChange={(event: ChangeEvent<HTMLInputElement>) => {
            handleChangeFieldValue('applyAll', event.target.checked)
          }}
        />
      </div>
    </div>
  )
}

export default ImageEditor;
