import { GithubEventTypes } from '../reference/constants';
import { mockActionCore, mockActionGithub } from '../../testHelpers';

const { action_core_spy, filter_str_update } = mockActionCore();
const { event_name_update, pr_variables_update } = mockActionGithub();

import FN from '../../src/main';

describe("main function tests", function () {
  
  describe("localComparison() cases", function () {
    describe("mock context and check proper eventName handling", function() {
      beforeAll( async function () {
        filter_str_update( "smth" )
        event_name_update( GithubEventTypes.release )
        await FN()
        
      })
  
      afterAll(async function() {
        action_core_spy.debug.mockClear()
        action_core_spy.info.mockClear()
        action_core_spy.getInput.mockClear()
        action_core_spy.setFailed.mockClear()
        action_core_spy.setOutput.mockClear()
      })

      it("check eventName", function () {
        const eventName_log = action_core_spy.info.mock.calls[0][0];

        expect( eventName_log ).toBe( `eventName is ${GithubEventTypes.release}` )
      })
    })

    describe("mock git_diff_result without matrix and check result of script", function() {
      let result: any;
      
      beforeAll( async function () {
        filter_str_update( "*.md" )
        event_name_update( GithubEventTypes.release )
        result = await FN()
        
      })
  
      afterAll(async function() {
        action_core_spy.debug.mockClear()
        action_core_spy.info.mockClear()
        action_core_spy.getInput.mockClear()
        action_core_spy.setFailed.mockClear()
        action_core_spy.setOutput.mockClear()
      })

      it('checking that the result is returning correctly', async function(){
        expect ( result ).toBe( '0' )
      })
    })

  })

  describe("githubComparison() cases", function () {
    describe("mock context and check base and head sha's", function() {
      const pr_base = "test_b", pr_head = "test_h";
      
      beforeAll( async function () {
        filter_str_update( "smth" )
        pr_variables_update( pr_base, pr_head )
        event_name_update( GithubEventTypes.pull_request )
        await FN()
        
      })
  
      afterAll(async function() {
        action_core_spy.debug.mockClear()
        action_core_spy.info.mockClear()
        action_core_spy.getInput.mockClear()
        action_core_spy.setFailed.mockClear()
        action_core_spy.setOutput.mockClear()
      })
  
      it('check that sha of base and head is correct', async function(){
        const logging_str = ( pr_variable: string, str: string ) => 
          `${pr_variable} commit: ${str}`;

        expect ( action_core_spy.info.mock.calls[1][0] ).toBe( logging_str( "Base", pr_base ) )
        expect ( action_core_spy.info.mock.calls[2][0] ).toBe( logging_str( "Head", pr_head ) )
      })
  
    })

    describe("validations", function() {
      describe("ENV var FILTER is mandatory", function() {
        const pr_base = "test_b", pr_head = "test_h";
        
        beforeAll( async function () {
          filter_str_update( "" )
          pr_variables_update( pr_base, pr_head )
          event_name_update( GithubEventTypes.pull_request )
          await FN()
          
        })
    
        afterAll(async function() {
          action_core_spy.debug.mockClear()
          action_core_spy.info.mockClear()
          action_core_spy.getInput.mockClear()
          action_core_spy.setFailed.mockClear()
          action_core_spy.setOutput.mockClear()
        })
    
        it('check FILTER validation error', async function(){
          const error_string = action_core_spy.setFailed.mock.calls[0][0];
          
          expect ( error_string ).toBe( "ENV var FILTER is mandatory" )
        })
    
      })

      describe("check pull_request sha error", function() {
        const pr_base = "", pr_head = "";
        
        beforeAll( async function () {
          filter_str_update( "smth" )
          pr_variables_update( pr_base, pr_head )
          event_name_update( GithubEventTypes.pull_request )
          await FN()
          
        })
    
        afterAll(async function() {
          action_core_spy.debug.mockClear()
          action_core_spy.info.mockClear()
          action_core_spy.getInput.mockClear()
          action_core_spy.setFailed.mockClear()
          action_core_spy.setOutput.mockClear()
        })
    
        it('check PR_base & PR_head validation error', async function(){
          const error_string = action_core_spy.setFailed.mock.calls[0][0];
          
          expect ( error_string ).toBe( 
            `The base and head commits are missing from the payload for this ${
              GithubEventTypes.pull_request} event. Please submit an issue.` 
          )
        })
    
      })
    })

    describe("matrix diffs and check result", function() {
        let result: any;
        const pr_base = "test_b", pr_head = "test_h";
        
        beforeAll( async function () {
          filter_str_update( "*.json" )
          pr_variables_update( pr_base, pr_head )
          event_name_update( GithubEventTypes.pull_request )
          result = await FN()
          
        })
    
        afterAll(async function() {
          action_core_spy.debug.mockClear()
          action_core_spy.info.mockClear()
          action_core_spy.getInput.mockClear()
          action_core_spy.setFailed.mockClear()
          action_core_spy.setOutput.mockClear()
        })
    
        it('checking that the result is returning correctly', async function(){
          expect ( result ).toBe( '1' )
        })

    })

  })

})