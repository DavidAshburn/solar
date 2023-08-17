require "test_helper"

class ResourcesControllerTest < ActionDispatch::IntegrationTest
  test "should get batteries" do
    get resources_batteries_url
    assert_response :success
  end
end
