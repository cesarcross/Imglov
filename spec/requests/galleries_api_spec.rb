require 'rails_helper'

RSpec.describe 'Galleries API', type: :request do
  include ActionDispatch::TestProcess

  let!(:user) { FactoryBot.create(:user) }
  let!(:other_user) { FactoryBot.create(:user) }
  let!(:gallery) { FactoryBot.create(:gallery, title: 'Old Gallery', user: user) }
  let(:image) { fixture_file_upload("#{Rails.root}/spec/files/attachment.png", 'image/png') }
  let(:valid_attributes) {{ title: 'Old Gallery', images_attributes: [{ file: image }] }}
  let(:invalid_attributes) {{ title: nil, images_attributes: [{ file: image }] }}
  let(:update_attributes) {{ title: 'Updated Gallery' }}

  describe 'fetch all galleries' do
    before do
      get api_v1_galleries_path
    end

    it 'responds successfully' do
      expect(response).to have_http_status(200)
    end

    it 'responds with JSON formatted output' do
      expect(response.content_type).to eq 'application/json'
    end
  end

  describe 'fetch a single gallery' do
    before do
      get api_v1_gallery_path(gallery)
    end

    it 'responds successfully' do
      expect(response).to have_http_status(200)
    end

    it 'responds with JSON formatted output' do
      expect(response.content_type).to eq 'application/json'
    end
  end

  describe 'create a gallery' do
    context 'as an authenticated user' do
      context 'with valid attributes' do
        it 'adds a gallery' do
          expect {
            post api_v1_galleries_path, params: { gallery: valid_attributes }, headers: auth_header(user)
            expect(response).to have_http_status(201)
          }.to change(user.galleries, :count).by(1)
        end
      end

      context 'with invalid attributes' do
        it 'does not add a gallery' do
          expect {
            post api_v1_galleries_path, params: { gallery: invalid_attributes }, headers: auth_header(user)
            expect(response).to have_http_status(422)
          }.to change(user.galleries, :count).by(0)
        end
      end
    end

    context 'as a guest' do
      it 'returns a 401 unauthorised response' do
        post api_v1_galleries_path, params: { gallery: valid_attributes }, headers: auth_header(nil)
        expect(response).to have_http_status(401)
      end
    end
  end

  describe 'update a gallery' do
    context 'as an authenticated user' do
      context 'who is authorised' do
        context 'with valid attributes' do
          it 'updates the gallery' do
            expect {
              patch api_v1_gallery_path(gallery), params: { gallery: update_attributes}, headers: auth_header(user)
              expect(response).to have_http_status(200)
              expect(gallery.reload.title).to eq 'Updated Gallery'
            }.to_not change(user.galleries, :count)
          end
        end

        context 'with invalid attributes' do
          it 'does not update the gallery' do
            patch api_v1_gallery_path(gallery), params: { gallery: invalid_attributes}, headers: auth_header(user)
            expect(response).to have_http_status(422)
            expect(gallery.reload.title).to eq 'Old Gallery'
          end
        end
      end

      context 'who is not authorised' do
        it 'does not update the gallery' do
          patch api_v1_gallery_path(gallery), params: { gallery: update_attributes}, headers: auth_header(other_user)
          # expect(response).to have_http_status(401)
          expect(gallery.reload.title).to eq 'Old Gallery'
        end
      end
    end

    context 'as a guest' do
      it 'does not update the gallery' do
        patch api_v1_gallery_path(gallery), params: { gallery: update_attributes}, headers: auth_header(nil)
        expect(response).to have_http_status(401)
        expect(gallery.reload.title).to eq 'Old Gallery'
      end
    end
  end

  describe 'destroy a gallery' do
    context 'as an authenticated user' do
      context 'who is authorised' do
        it 'deletes the gallery' do
          expect {
            delete api_v1_gallery_path(gallery), headers: auth_header(user)
            expect(response).to have_http_status(204)
          }.to change(user.galleries, :count).by(-1)
        end
      end

      context 'who is not authorised' do
        it 'does not delete the gallery' do
          expect {
            delete api_v1_gallery_path(gallery), headers: auth_header(other_user)
            expect(response).to have_http_status(401)
          }.to_not change(user.galleries, :count)
        end
      end
    end

    context 'as a guest' do
      it 'does not delete the gallery' do
        expect {
          delete api_v1_gallery_path(gallery), headers: auth_header(nil)
          expect(response).to have_http_status(401)
        }.to_not change(user.galleries, :count)
      end
    end
  end
end
