
import { mockGithubCore, mockConfig } from '../../testHelpers';

const { github_core_spy, tg_message_update } = mockGithubCore()
mockConfig();

import FN from '../../src/main';
import { ErrorTypes } from '../reference/errors';

describe("main function tests", function () {
  describe("If sending failes, check core.setFailed", function() {
    let result;
    const setFailedMsg = "Request failed with status code 404";
    const tg_msg = "axios err 404";

    beforeAll( async function () {
      tg_message_update( tg_msg )
      result = await FN()
    })

    afterAll(async function() {
      github_core_spy.debug.mockClear()
      github_core_spy.getInput.mockClear()
      github_core_spy.isDebug.mockClear()
      github_core_spy.setFailed.mockClear()
      github_core_spy.setOutput.mockClear()
    })

    it('properly get BODY from core input', async function(){
      expect (
        github_core_spy.getInput.mock.results[2].value
      ).toBe( tg_msg )
    })

    it('properly message incomed to setFailed()', function () {
      const calls = github_core_spy.setFailed.mock.calls;
      
      expect( calls.length ).toBe(1)
      expect( calls[0][0] ).toEqual( setFailedMsg )
    })
  
  })

  describe("if message is too long, check for proper setFailed", function() {
    let result;
    const tg_msg = "error from send_notification() about message being too long";

    beforeAll( async function () {
      tg_message_update( tg_msg )

      result = await FN()
    })

    afterAll(async function() {
      github_core_spy.debug.mockClear()
      github_core_spy.getInput.mockClear()
      github_core_spy.isDebug.mockClear()
      github_core_spy.setFailed.mockClear()
      github_core_spy.setOutput.mockClear()
    })

    it('properly get BODY from core input', async function(){
      expect (
        github_core_spy.getInput.mock.results[2].value
      ).toBe( tg_msg )
    })

    it('properly message incomed to setFailed()', function () {
      const calls = github_core_spy.setFailed.mock.calls;
      
      expect( calls.length ).toBe(1)
      expect( calls[0][0] ).toEqual( ErrorTypes.message_length_too_long )
    })
  
  })
})