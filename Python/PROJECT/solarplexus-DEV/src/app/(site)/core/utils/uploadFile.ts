import axios from 'axios';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { IMessage } from '../providers/ChatbotProvider';
import {
  validateBrandGuidelines,
  validateFile,
  validateLogo,
  validatePictureBank,
  validateToneOfVoice,
} from './fileValidation';

export default async function uploadFile(
  bucketName: string,
  fileName: string,
  file: File,
  setStatus: (status: string) => void,
  folderID: number | null,
  addMessage: (message: IMessage) => void,
) {
  const supabase = createClientComponentClient({
    supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL,
    supabaseKey: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const timestamp = Date.now();
  const uniqueFileName = `${fileName}-${timestamp}`;

  // get the folder details
  const { data: folderData, error: folderError1 } = await supabase
    .from('folder_data')
    .select('*')
    .eq('user_id', user?.id)
    .eq('id', folderID)
    .single();

  console.log('folderData: ', folderData);

  const folderType = folderData.type;

  // Perform validation based on folder type
  let validation = null;

  switch (folderType) {
    case 'picture_bank':
      validation = validatePictureBank(file);
      break;
    case 'tone_of_voice':
      validation = validateToneOfVoice(file);
      break;
    case 'brand_guidelines':
      validation = validateBrandGuidelines(file);
      break;
    case 'logo':
      validation = validateLogo(file);
      break;
    default:
      validation = validateFile(file);
  }

  if (!validation.isValid) {
    // Handle invalid file
    setStatus(validation.error);
    return;
  }

  // call the validations function

  const { data: uploadResponse, error: uploadError } = await supabase.storage
    .from(bucketName)
    .upload(
      'brand-guidelines-asset/' +
        user?.id +
        '/' +
        folderData.type +
        '/' +
        uniqueFileName,
      file,
      {
        cacheControl: '3600',
      },
    );

  console.log('response from uploadFile: ', uploadResponse);

  if (uploadError) {
    throw uploadError;
  }

  // store the path in the database file_data table
  const file_insert_res = await supabase
    .from('file_data')
    .insert([
      {
        name: fileName,
        path: uploadResponse.path,
        type: folderData.type,
        folder_id: folderID,
        user_id: user?.id,
        language: 'english',
      },
    ])
    .select();

  console.log('file_insert_res: ', file_insert_res);

  setStatus('Uploaded Successfully');

  const user_data = await supabase.auth.getUser();

  const { data } = await supabase.from('chat_history').insert([
    {
      user_id: user_data?.data?.user?.id,
      is_user: false,
      chat_text: `Your file ${fileName} has been uploaded successfully.`,
    },
  ]);
  var file_upload_message: IMessage = {
    date: new Date().toISOString(),
    message: `Your file ${fileName} has been uploaded successfully.`,
    isUser: false,
  };

  addMessage(file_upload_message);

  if (folderType === 'brand_guidelines') {
    try {
      axios
        .post(
          'https://54.197.180.185/api/brand_guidelines_asset/data_extraction/',
          {
            user_id: user?.id,
            // @ts-ignore
            file_id: file_insert_res.data[0].id,
          },
          {
            headers: {
              accept: 'application/json',
              'Content-Type': 'application/json',
            },
          },
        )
        .then(async (res) => {
          var questions = res.data.question_answer;
          // add a message such that here are some questions that might be helpful
          const message: IMessage = {
            date: new Date().toISOString(),
            message:
              'Here are some questions that might be helpful about your brand guidelines',
            isUser: false,
          };

          addMessage(message);
          const { data: ref2 } = await supabase.from('chat_history').insert([
            {
              user_id: user_data?.data?.user?.id,
              is_user: false,
              chat_text: message.message,
            },
          ]);

          // each question is an object with question and answer render the question and answer using the addMessage function

          // create a single message with `\nQuestion: ${question}\nAnswer: ${answer}\n`

          for (let i = 0; i < questions.length; i++) {
            const question_message: IMessage = {
              date: new Date().toISOString(),
              message: questions[i].question,
              isUser: false,
            };

            addMessage(question_message);

            const { data: ref3 } = await supabase.from('chat_history').insert([
              {
                user_id: user_data?.data?.user?.id,
                is_user: false,
                chat_text: question_message.message,
              },
            ]);

            const answer_message: IMessage = {
              date: new Date().toISOString(),
              message: questions[i].answer,
              isUser: true,
            };

            addMessage(answer_message);

            const { data: ref4 } = await supabase.from('chat_history').insert([
              {
                user_id: user_data?.data?.user?.id,
                is_user: true,
                chat_text: answer_message.message,
              },
            ]);
          }
        });
    } catch (apiError) {
      console.error('API Error: ', apiError);
    }
  }else if(folderType === 'picture_bank'){
    var res_text = "Yes, that looks like pictures to me!"
    const message: IMessage = {
      date: new Date().toISOString(),
      message: res_text,
      isUser: false,
    };
    
    addMessage(message);
  }else if(folderType === 'tone_of_voice'){
    var res_text = "Yes, that looks like tone of voice to me!"
    const message: IMessage = {
      date: new Date().toISOString(),
      message: res_text,
      isUser: false,
    };
    
    addMessage(message);

  }else if(folderType === 'logo'){

    var res_text = "Yes, that looks like logo to me!"
    const message: IMessage = {
      date: new Date().toISOString(),
      message: res_text,
      isUser: false,
    };
    
    addMessage(message);

  }


  return uploadResponse;
}
